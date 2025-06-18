"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Layout from "../Layout";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import Button from "../button/Button";
import PlantsList from "../../plants/PlantsList";
import { useLanguages } from "@/lib/hooks/useLanguages";
import { useEffect, useState } from "react";
import { resetAfterActivity } from "@/lib/features/garden/gardenUISlice";
import { useHarvestPlantMutation, useWaterPlantMutation } from "@/lib/services/garden/gardenApi";
import { useAddPlantMutation } from "@/lib/services/inventory/inventoryApi";
import { selectCurrentUserId } from "@/lib/services/user/userApi";

export default function Footer() {
    const widthBP = useAppSelector(selectWidthBreakpoint);
    const lang = useLanguages();
    const [waterEnabled, setWaterEnabled] = useState(true);
    
    const userId = useAppSelector(selectCurrentUserId);

    const dispatch = useAppDispatch();
      const { selectedGardenPlant } = useAppSelector((state) => state.gardenUI);
      const [harvestPlant, {isLoading: isHarvestPlantLoading}] = useHarvestPlantMutation();
      const [addPlant, {isLoading: isAddPlantLoading}] = useAddPlantMutation();
      const [waterPlant, { isLoading: isWaterLoading }] = useWaterPlantMutation();
      const isLoading = isHarvestPlantLoading || isAddPlantLoading || isWaterLoading;
    
      const handleHarvest = async () => {
        try {
          if(!selectedGardenPlant) return;
    
          await harvestPlant(selectedGardenPlant.gardenPlantId);
    
          if(selectedGardenPlant.growthStage === "plant") {
            await addPlant({userId, plantId: selectedGardenPlant.id, amount: 3});
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
    
          await waterPlant({plantId: selectedGardenPlant.gardenPlantId, waterCount: selectedGardenPlant.waterCount})
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
        <footer className="py-4 md:py-6 bg-background-2 border-t-3 border-black">
            <Layout>
                {widthBP !== 'xs' ? 
                <span className="text-center block">{lang("copyright")}</span>
                :
                <div className="flex gap-4 justify-center">
                    <Button type="water" disabled = {!selectedGardenPlant || selectedGardenPlant.growthStage === "plant" || isLoading || !waterEnabled} onClick={handleWater}/>
                    <PlantsList side="left" type="inventory"/>
                    <PlantsList side="right" type="shop"/>
                    <Button type="dig" disabled = {!selectedGardenPlant || isLoading} onClick={handleHarvest}/>
                </div> }
            </Layout>
        </footer>
    )
}