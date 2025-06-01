'use client';

import PlantCard from "./PlantCard";
import Line from "./Line";
import Button from "../layout/button/Button";
import { useState } from "react";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { useGetPlantsQuery } from "@/lib/services/plants/plantsApi";


export default function PlantsList(props: {side: 'right' | 'left', type: 'inventory' | 'shop'}) {
  const [isOpened, setIsOpened] = useState(false);
  const widthBP = useAppSelector(selectWidthBreakpoint);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpened(false));

  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = widthBP === 'xs' || widthBP === 'sm' ? 24 : widthBP === 'md' || widthBP === 'lg' ? 36 : widthBP === 'xl' ? 15 : 20;

  const { data: plants = [], isLoading, isError } = useGetPlantsQuery();

  const inventory = useAppSelector((state) => state.player.inventory);

  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const shopItems = props.type === "shop" 
    ? plants.slice(pageFirstIndex, pageFirstIndex + itemsPerPage) 
    : [];
  
  const inventoryItems = props.type === "inventory" 
    ? inventory.slice(pageFirstIndex, pageFirstIndex + itemsPerPage)
    : [];

  return (
    <div className={`flex flex-col gap-8 ${props.side === 'right' ? 'items-start' : 'items-end'} relative xl:w-72 2xl:w-93.5`}>
      <Button type={props.type} onClick={() => setIsOpened(!isOpened)}/>
      {isOpened && <>
        {widthBP === 'xl' ||  widthBP === '2xl' ? 
        <>
          <Line side={props.side}/>
          <div className="flex flex-col w-full gap-6 relative z-1 bg-dark-beige rounded-sm p-6 border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black h-full justify-between">
            {isLoading ?
              <div className="border-4 border-black border-t-green rounded-full size-9 animate-spin absolute top-1/2 right-[calc(50%-36px)] -translate-1/2">
              </div>
            :
              <>
                <div className="grid grid-cols-3 2xl:grid-cols-4 gap-6 content-start">
                  {props.type === "inventory" 
                  ? inventoryItems.map((plant, index) => (
                      <PlantCard 
                        key={index} 
                        type={props.type} 
                        name={plant.name} 
                        rarity={plant.rarity} 
                        amount={plant.amount}
                      />
                    ))
                  : shopItems.map((plant, index) => (
                      <PlantCard 
                        key={index} 
                        type={props.type} 
                        name={plant.name} 
                        rarity={plant.rarity} 
                        price={plant.price}
                      />
                    ))
                  } 
                </div>
                <div className="flex justify-center gap-6">
                  <Button type="arrow" arrowType="prev" className="relative bg-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
                  <Button type="arrow" arrowType="next" className="relative bg-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(plants.length / itemsPerPage)}/>
                </div>
              </>
            }
          </div>
        </>
        : 
        <div className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
          <div ref={ref} className="relative min-w-75 min-h-53 bg-dark-beige rounded-sm size-fit justify-items-center content-start inline-grid p-6 grid-cols-4 md:grid-cols-6 gap-6 border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
            {isLoading ?
              <div className="border-4 border-black border-t-green rounded-full size-6 md:size-9 animate-spin absolute top-1/2 right-[calc(50%-36px)] -translate-1/2">
              </div>
            :
              <>
                {props.type === "inventory" 
                  ? inventoryItems.map((plant, index) => (
                      <PlantCard 
                        key={index} 
                        type={props.type} 
                        name={plant.name} 
                        rarity={plant.rarity} 
                        amount={plant.amount}
                      />
                    ))
                  : shopItems.map((plant, index) => (
                      <PlantCard 
                        key={index} 
                        type={props.type} 
                        name={plant.name} 
                        rarity={plant.rarity} 
                        price={plant.price}
                      />
                    ))
                  } 
                <Button type="arrow" arrowType="prev" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
                <Button type="arrow" arrowType="next" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(plants.length / itemsPerPage)}/>
              </>
            }
          </div>
        </div>
        }
      </>}
    </div>
  );
};
