import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cancelPlanting, endPlanting, resetAfterPlanting, startPlanting } from "@/lib/features/garden/gardenUISlice";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import type { GardenPlant, GrowthStage } from "@/lib/types/plants";
import { selectCurrentUserId } from "@/lib/services/user/userApi";
import { usePlantInBedMutation, useUpdateGrowthStageMutation } from "@/lib/services/garden/gardenApi";
import { useRemovePlantMutation } from "@/lib/services/inventory/inventoryApi";
import { useEffect, useRef, useState } from "react";

interface GardenBedPlant extends GardenPlant {
  gardenPlantId: number;
  name: string;
  growthTime: number;
}

interface GardenBed {
  id: number,
  plant: GardenBedPlant | null,
}

export default function GardenBed({ id, plant }: GardenBed) {
  const [progress, setProgress] = useState(0);
  const [updateStage, setUpdateStage] = useState<GrowthStage>("seed");
  const dispatch = useAppDispatch();
  const { selectedPlant, isPlanting } = useAppSelector((state) => state.gardenUI);
  const userId = useAppSelector(selectCurrentUserId);
  const [plantInBed, {isLoading: isPlantInBedLoading} ] = usePlantInBedMutation();
  const [updateGrowthStage] = useUpdateGrowthStageMutation();
  const [removePlant, {isLoading: isRemovePlantLoading}] = useRemovePlantMutation();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    dispatch(cancelPlanting());
  });
  const isLoading = isPlantInBedLoading || isRemovePlantLoading;

  useEffect(() => {
    if(!plant) return;

    const startTime = new Date(plant.plantedAt).getTime();
    const totalTime = plant.growthTime * 1000;
    let interval: NodeJS.Timeout | null = null;

    const updateProgress = () => {
      const currentTime = Date.now();
      const timePassed = currentTime - startTime;
      const progressPercent = Math.min(100, (timePassed / totalTime) * 100);
      setProgress(progressPercent);

      if (progressPercent >= 50 && plant.growthStage === "seed" && updateStage !== "sprout" && updateStage !== "plant") {
        setUpdateStage("sprout");
        updateGrowthStage({ 
          id: plant.gardenPlantId, 
          growthStage: "sprout" 
        });
      }

      if (progressPercent >= 100 && plant.growthStage === "sprout" && updateStage !== "plant") {
        setUpdateStage("plant");
        updateGrowthStage({ 
          id: plant.gardenPlantId, 
          growthStage: "plant" 
        });
      }

      if (progressPercent >= 100 && interval) {
        clearInterval(interval);
      }
    }

    updateProgress();

    if(progress < 100) {
      interval = setInterval(updateProgress, 1000);
    }

    return () => {
      if (progress >= 100 && interval) clearInterval(interval);
    };
  }, [plant]);

  const handleClick = async () => {
    if (!isLoading && !plant && selectedPlant && userId) {
      try {
        dispatch(resetAfterPlanting());
        dispatch(startPlanting());
        await plantInBed({
          userId,
          gardenBed: id,
          plantId: selectedPlant.id
        }).unwrap();

        await removePlant({ 
          userId, 
          plantId: selectedPlant.id,
        }).unwrap();
      } catch (error) {
        console.error("Planting failed:", error);
      } finally {
        dispatch(endPlanting());
      }
    }
  };

  return (
    <div ref={ref} className={`relative size-12 md:size-16 bg-dark-beige rounded-sm p-1 border-2 md:border-3 ${selectedPlant && !plant ? "cursor-pointer border-green" : "border-black"} flex items-center justify-center`} onClick={handleClick}>
      {isLoading ? 
      <div className="size-9 md:size-12 bg-light-beige rounded-sm flex items-center justify-center">
        <div className="border-4 border-black border-t-green rounded-full size-9 animate-spin">
        </div>
      </div>
      : plant ? (
        <>
          <Image
            className="size-9 md:size-12"
            src={`/${plant.name}-${plant.growthStage}.svg`}
            alt={`${plant.name}-${plant.growthStage}`}
            width={48}
            height={48}
            priority 
          />
          {progress !== 100
            &&
            <div className="absolute w-full h-2 md:h-2.5 border-2 md:border-3 rounded-full -top-4 md:-top-5 bg-background">
              <span className={`h-full block bg-green rounded-full`} style={{ width: `${progress}%` }}></span>
            </div>
          }
          
        </>
      ) : (
        <div className="size-9 md:size-12 bg-light-beige rounded-sm" />
      )}
    </div>
  );
};
