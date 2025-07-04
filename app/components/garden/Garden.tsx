'use client';

import GardenBed from "./GardenBed";
import Button from "../layout/button/Button";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useEffect, useState } from "react";
import { selectCurrentUserBalance, selectCurrentUserId } from "@/lib/services/user/userApi";
import { useGetGardenQuery, useHarvestPlantMutation, useWaterPlantMutation } from "@/lib/services/garden/gardenApi";
import { useGetPlantsQuery } from "@/lib/services/plants/plantsApi";
import { cancelGardenPlantSelecting, resetAfterActivity } from "@/lib/features/garden/gardenUISlice";
import { useAddPlantMutation } from "@/lib/services/inventory/inventoryApi";
import { useLanguages } from "@/lib/hooks/useLanguages";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { cancelPlanting } from "@/lib/features/inventory/inventoryUISlice";
import { useUpdateProgressMutation } from "@/lib/services/achievements/achievementsApi";

export default function Garden() {
  const lang = useLanguages();
  const [waterEnabled, setWaterEnabled] = useState(true);

  const widthBP = useAppSelector(selectWidthBreakpoint);
  const [currentPage, setCurrentPage] = useState(1);

  const balance = useAppSelector(selectCurrentUserBalance);
  const userId = useAppSelector(selectCurrentUserId);

  const { data: gardenPlants = [] } = useGetGardenQuery(userId);
  const { data: allPlants = [] } = useGetPlantsQuery();

  const plantMap = new Map(allPlants.map(plant => [plant.id, plant]));

  const beds = Array.from({ length: 36 }, (bed, index) => {
    const gardenPlant = gardenPlants.find(p => p.gardenBed === index);
    if (!gardenPlant) return { globalIndex: index, data: null };
    
    const plantData = plantMap.get(gardenPlant.plantId);
    return {
      globalIndex: index,
      data: plantData ? {
        gardenPlantId: gardenPlant.id,
        ...gardenPlant,
        ...plantData,
      } : null
    };
  });

  const itemsPerPage = 24;
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visibleBeds = beds.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  const dispatch = useAppDispatch();
  const { selectedGardenPlant } = useAppSelector((state) => state.gardenUI);
  const [harvestPlant, {isLoading: isHarvestPlantLoading}] = useHarvestPlantMutation();
  const [addPlant, {isLoading: isAddPlantLoading}] = useAddPlantMutation();
  const [waterPlant, { isLoading: isWaterLoading }] = useWaterPlantMutation();
  const [updateProgress, {isLoading: isUpdateProgressLoading}] = useUpdateProgressMutation();
  const isLoading = isHarvestPlantLoading || isAddPlantLoading || isWaterLoading || isUpdateProgressLoading;

  const { selectedPlant, isInventoryOpened } = useAppSelector((state) => state.inventoryUI);

  const ref = useOutsideClick<HTMLDivElement>(() => {
    if((selectedPlant && widthBP === 'xs' && !isInventoryOpened) || (selectedPlant && widthBP !== 'xs')) {
      dispatch(cancelPlanting());
    }
  });

  const handleHarvest = async () => {
    try {
      if(!selectedGardenPlant) return;

      await harvestPlant(selectedGardenPlant.gardenPlantId);

      if(selectedGardenPlant.growthStage === "plant") {
        await addPlant({userId, plantId: selectedGardenPlant.id, amount: 3});

        await updateProgress({ 
          userId, 
          action: "harvest any",
        }).unwrap();

        await updateProgress({ 
          userId,
          action: `harvest ${selectedGardenPlant.name}`,
        }).unwrap();
      }
    } catch (error) {
      console.error("Harvesting failed:", error);
    } finally {
      dispatch(resetAfterActivity());
    }
  }

  const handleWater = async () => {
    try {
      if(!selectedGardenPlant) return;

      await waterPlant({plantId: selectedGardenPlant.gardenPlantId, waterCount: selectedGardenPlant.waterCount});

      await updateProgress({ 
        userId, 
        action: "water any",
      }).unwrap();

      await updateProgress({ 
        userId,
        action: `water ${selectedGardenPlant.name}`,
      }).unwrap();
    } catch (error) {
      console.error("Watering failed:", error);
    } finally {
      dispatch(resetAfterActivity());
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const lastWateredDate = selectedGardenPlant?.lastWatered;

    if (lastWateredDate) {
      const lastWateredTime = new Date(lastWateredDate).getTime();
      const currentTime = Date.now();
      const timeDifference = currentTime - lastWateredTime;
      const timeLeft = 10000 - timeDifference;
      if (timeLeft > 0) {
        timer = setTimeout(() => {
          setWaterEnabled(true);
        }, timeLeft);
        setWaterEnabled(false);
      } else {
        setWaterEnabled(true);
      }
    } else {
      setWaterEnabled(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selectedGardenPlant]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full md:w-auto">
      <div ref={ref} className="relative max-w-full mx-auto justify-items-center bg-beige rounded-sm p-6 md:p-8 inline-grid grid-cols-4 sm:grid-cols-[repeat(auto-fit,minmax(48px,48px))] md:grid-cols-6 gap-6 md:gap-8 border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
        {widthBP !== 'xs' ? beds.map((bed) => (
          <GardenBed key={bed.globalIndex} id={bed.globalIndex} plant={bed.data} />
        ))
        :
        visibleBeds.map((bed) => (
          <GardenBed key={bed.globalIndex} id={bed.globalIndex} plant={bed.data} />
        ))}
        
        {widthBP === 'xs' && (
          <>
            <Button 
              type="arrow" 
              isAbsolute 
              arrowType="prev"
              className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" 
              onClick={() => setCurrentPage(page => page - 1)} 
              disabled={currentPage === 1}
            />
            <Button 
              type="arrow" 
              isAbsolute 
              arrowType="next" 
              className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" 
              onClick={() => setCurrentPage(page => page + 1)} 
              disabled={currentPage === Math.ceil(beds.length / itemsPerPage)}
            />
          </>
        )}
      </div>
      
      <div className="flex gap-8 items-center">
        {widthBP !== 'xs' && <Button type="water" disabled = {!selectedGardenPlant || selectedGardenPlant.growthStage === "plant" || isLoading || !waterEnabled} onClick={handleWater}/>}
        <span className="p-2 md:p-3 w-full border-2 md:border-3 border-black rounded-sm bg-dark-beige text-center drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
          {lang("money")}: {balance || "0"}$
        </span>
        {widthBP !== 'xs' && <Button type="dig" disabled = {!selectedGardenPlant || isLoading} onClick={handleHarvest}/>}
      </div>
    </div>
  );
};
