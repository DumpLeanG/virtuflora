import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { cancelPlanting, plantOnBed, type GardenBed } from "@/lib/features/garden/gardenSlice";
import { GrowingPlant } from "@/lib/types/plants";
import { decreasePlantAmount } from "@/lib/features/player/playerSlice";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

export default function GardenBed({ id, plant }: GardenBed) {
  const dispatch = useAppDispatch();
  const { isPlanting, selectedPlant } = useAppSelector((state) => state.garden);
  const ref = useOutsideClick<HTMLDivElement>(() => {
    dispatch(cancelPlanting());
  });

  const handleClick = () => {
    if (isPlanting && !plant && selectedPlant) {
      dispatch(plantOnBed(id));
      dispatch(decreasePlantAmount(selectedPlant.name));
    }
  };

  return (
    <div ref={ref} className={`bg-dark-beige rounded-sm p-1 border-2 md:border-3 ${isPlanting ? "cursor-pointer border-green" : "border-black"} flex items-center justify-center`} onClick={handleClick}>
      {plant ? (
        <Image
          className="size-9 md:size-12 object-contain"
          src={`/${plant.name}.svg`}
          alt={`${plant.name}-plant`}
          width={52}
          height={52}
          priority 
        />
      ) : (
        <div className="size-9 md:size-12 bg-light-beige rounded-sm" />
      )}
    </div>
  );
};
