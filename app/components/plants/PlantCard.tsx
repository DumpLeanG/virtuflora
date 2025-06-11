import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { selectPlant } from "@/lib/features/garden/gardenUISlice";
import type { PlantBase } from '@/lib/types/plants';
import { useAddPlantMutation } from "@/lib/services/inventory/inventoryApi";
import { selectCurrentUserBalance, selectCurrentUserId, useUpdateBalanceMutation } from "@/lib/services/user/userApi";

interface PlantsListProps {
  type: 'inventory' | 'shop';
}

interface ShopPlantCardProps extends PlantBase, PlantsListProps {
  price: number;
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
  const [addPlant] = useAddPlantMutation();
  const [updateBalance] = useUpdateBalanceMutation();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    if (props.type === "inventory" && props.amount > 0) {
      dispatch(selectPlant({
          id: props.id,
          name: props.name,
          rarity: props.rarity,
      }));
    }
    else if (props.type === "shop" && props.price) {
      if(!userId) throw new Error("User not authenticated!");
      
      try {
        await addPlant({userId: userId, plantId: props.id, amount: 1}).unwrap();

        await updateBalance({price: props.price, balance: balance}).unwrap();

        return true;
      } catch (error) {
        console.error("Purchase failed:", error);
        throw error;
      }
    }
  };

  const canBuy = props.type === "shop" && props.price && balance >= props.price;
  const isDisabled = props.type === "shop" && !canBuy;

  return (
    <div className={`group flex flex-col ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`} onClick={!isDisabled ? handleClick : undefined}>
      <div className={`bg-background rounded-sm p-2 md:p-3 border-2 md:border-3 ${colors[props.rarity].color} flex items-center justify-center drop-shadow-2 md:drop-shadow-3 ${!isDisabled && 'group-hover:scale-105 transition-transform'}`}>
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
        <span className={`${!isDisabled && 'group-hover:scale-105 transition-transform'} text-sm rounded-sm bg-background border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black text-center`}>
          x{props.amount}
        </span>
        :
        <span className={`${!isDisabled && 'group-hover:scale-105 transition-transform'} text-sm rounded-sm bg-background border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black text-center`}>
          {props.price}$
        </span>
      }
    </div>
  );
};
