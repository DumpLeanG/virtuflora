import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cancelPlanting, resetAfterPlanting } from "@/lib/features/garden/gardenUISlice";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { GardenPlant} from "@/lib/types/plants";
import { selectCurrentUserId } from "@/lib/services/user/userApi";
import { usePlantInBedMutation } from "@/lib/services/garden/gardenApi";
import { useRemovePlantMutation } from "@/lib/services/inventory/inventoryApi";

interface GardenBedPlant extends GardenPlant {
  name: string;
}

interface GardenBed {
  id: number,
  plant: GardenBedPlant | null,
}

export default function GardenBed({ id, plant }: GardenBed) {
  const dispatch = useAppDispatch();
  const { selectedPlant } = useAppSelector((state) => state.gardenUI);
  const userId = useAppSelector(selectCurrentUserId);
  const [plantInBed, {isLoading} ] = usePlantInBedMutation();
  const [removePlant] = useRemovePlantMutation();
  const ref = useOutsideClick<HTMLDivElement>(() => {
    dispatch(cancelPlanting());
  });

  const handleClick = async () => {
    if (!isLoading && !plant && selectedPlant && userId) {
      try {
        await plantInBed({
          userId,
          gardenBed: id,
          plantId: selectedPlant.id
        }).unwrap();

        dispatch(resetAfterPlanting());

        await removePlant({ 
          userId, 
          plantId: selectedPlant.id,
        });
      } catch (error) {
        console.error("Planting failed:", error);
      }
    }
  };

  return (
    <div ref={ref} className={`size-12 md:size-16 bg-dark-beige rounded-sm p-1 border-2 md:border-3 ${selectedPlant && !plant ? "cursor-pointer border-green" : "border-black"} flex items-center justify-center`} onClick={handleClick}>
      {isLoading ? 
      <div className="size-9 md:size-12 bg-light-beige rounded-sm flex items-center justify-center">
        <div className="border-4 border-black border-t-green rounded-full size-9 animate-spin">
        </div>
      </div>
      : plant ? (
        <Image
          className="size-9 md:size-12"
          src={`/${plant.name}-${plant.growthStage}.svg`}
          alt={`${plant.name}-${plant.growthStage}`}
          width={48}
          height={48}
          priority 
        />
      ) : (
        <div className="size-9 md:size-12 bg-light-beige rounded-sm" />
      )}
    </div>
  );
};
