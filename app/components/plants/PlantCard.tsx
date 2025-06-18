import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setSelectedPlant, resetAfterPlanting } from "@/lib/features/inventory/inventoryUISlice";
import type { PlantBase } from '@/lib/types/plants';
import { useAddPlantMutation, useRemovePlantMutation } from "@/lib/services/inventory/inventoryApi";
import { selectCurrentUserBalance, selectCurrentUserId, useUpdateBalanceMutation } from "@/lib/services/user/userApi";
import { useLanguages } from "@/lib/hooks/useLanguages";

interface PlantsListProps {
  type: 'inventory' | 'shop';
  price: number;
}

interface ShopPlantCardProps extends PlantBase, PlantsListProps {
  type: 'shop';
}

interface InventoryPlantCardProps extends PlantBase, PlantsListProps {
  amount: number;
  type: 'inventory';
}

type PlantCardProps = ShopPlantCardProps | InventoryPlantCardProps;

const colors = {
  common: {
    color: "border-gray"
  },
  rare: {
    color: "border-blue"
  },
  epic: {
    color: "border-purple"
  },
  legendary: {
    color: "border-orange"
  }
}

export default function PlantCard(props : PlantCardProps) {
  const userId = useAppSelector(selectCurrentUserId);
  const balance = useAppSelector(selectCurrentUserBalance);
  const { selectedPlant, isPlanting } = useAppSelector((state) => state.inventoryUI);
  const [addPlant, {isLoading: isAddPlantLoading}] = useAddPlantMutation();
  const [updateBalance, {isLoading: isUpdateBalanceLoading}] = useUpdateBalanceMutation();
  const [removePlant, {isLoading: isRemovePlantLoading}] = useRemovePlantMutation();
  const dispatch = useAppDispatch();
  const isLoading = isAddPlantLoading || isUpdateBalanceLoading || isRemovePlantLoading;

  const lang = useLanguages();

  const handleClick = async () => {
    if (props.type === "inventory" && props.amount > 0) {
      if(selectedPlant && selectedPlant.id === props.id) {
        try {
          const sellingPrice = -(props.price / 2);
          await removePlant({userId, plantId: props.id}).unwrap();
          await updateBalance({price: sellingPrice, balance: balance}).unwrap();
        } catch (error) {
          console.error("Sell failed:", error);
          throw error;
        } finally {
          dispatch(resetAfterPlanting());
        } 
      } else {
        dispatch(setSelectedPlant({
            id: props.id,
            name: props.name,
            price: props.price,
        }));
      }
    }
    else if (props.type === "shop" && props.price) {
      if(!userId) throw new Error("User not authenticated!");
      
      try {
        await addPlant({userId, plantId: props.id, amount: 1}).unwrap();
        await updateBalance({price: props.price, balance: balance}).unwrap();
      } catch (error) {
        console.error("Purchase failed:", error);
        throw error;
      }
    }
  };

  const canBuy = props.type === "shop" && props.price && balance >= props.price;
  const isDisabled = (props.type === "shop" && !canBuy) || (props.type === "inventory" && isPlanting) || isLoading;

  return (
    <div className={`group flex flex-col ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={!isDisabled ? handleClick : undefined}>
      <div className={`bg-background rounded-sm p-2 md:p-3 border-2 md:border-3 ${colors[props.rarity].color} flex items-center justify-center ${selectedPlant?.id === props.id ? "drop-shadow-none" : "drop-shadow-2 md:drop-shadow-3"} ${!isDisabled && 'group-hover:scale-105 transition-transform'}`}>
        <Image
          className="size-6 md:size-8 object-contain"
          src={`/${props.name}.svg`}
          alt={props.name}
          width={36}
          height={36}
          priority 
        />
      </div>
      {props.type === "inventory" ? 
        (selectedPlant?.id === props.id ?
          <span className={`${!isDisabled && 'group-hover:scale-105 transition-transform'} text-xs md:text-sm rounded-sm bg-red border-2 md:border-3 border-black ${selectedPlant?.id === props.id ? "drop-shadow-none" : "drop-shadow-2 md:drop-shadow-3"} drop-shadow-black text-center`}>
            {lang("sellBtn")}
          </span>
        : 
          <span className={`${!isDisabled && 'group-hover:scale-105 transition-transform'} text-xs md:text-sm rounded-sm bg-background border-2 md:border-3 border-black ${selectedPlant?.id === props.id ? "drop-shadow-none" : "drop-shadow-2 md:drop-shadow-3"} drop-shadow-black text-center`}>
            x{props.amount}
          </span>
        )
        :
        <span className={`${!isDisabled && 'group-hover:scale-105 transition-transform'} text-xs md:text-sm rounded-sm bg-background border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black text-center`}>
          {props.price}$
        </span>
      }
    </div>
  );
};
