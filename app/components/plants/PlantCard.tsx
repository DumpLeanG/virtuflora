import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { selectPlant } from "@/lib/features/garden/gardenSlice";
import { buyPlant } from "@/lib/features/player/playerSlice";
import type { PlantBase } from '@/lib/types/plants';

interface PlantsListProps {
  type: 'inventory' | 'shop';
}

export interface PlantCardProps extends PlantBase, PlantsListProps {
  price?: number;
  amount?: number;
}

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
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.player.balance);

  const handleClick = () => {
    if (props.type === "inventory" && props.amount && props.amount > 0) {
      dispatch(selectPlant({ 
        id: props.id,
        name: props.name, 
        rarity: props.rarity, 
        stage: "seed" 
      }));
    }
    else if (props.type === "shop" && props.price) {
      dispatch(buyPlant({ id: props.id, name: props.name, rarity: props.rarity, price: props.price, amount: 1 }));
    }
  };

  const canBuy = props.type === "shop" && props.price && balance >= props.price;
  const isDisabled = props.type === "shop" && !canBuy;

  return (
    <div 
      className={`flex flex-col ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`} 
      onClick={!isDisabled ? handleClick : undefined}
    >
      <div className={`bg-background rounded-sm p-2 md:p-3 border-2 md:border-3 ${colors[props.rarity].color} flex items-center justify-center drop-shadow-2 md:drop-shadow-3 ${!isDisabled && 'hover:scale-105 transition-transform'}`}>
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
        <span className="text-sm rounded-sm bg-background border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black text-center">
          x{props.amount}
        </span>
        :
        <span className="text-sm rounded-sm bg-background border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black text-center">
          {props.price}$
        </span>
      }
    </div>
  );
};
