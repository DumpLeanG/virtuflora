'use client';

import PlantCard from "./PlantCard";
import Line from "./Line";
import Button from "../layout/button/Button";
import { useState } from "react";
import { selectBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks";

export default function PlantsList(props: {side: 'right' | 'left', buttonType: 'inventory' | 'shop'}) {
  const [isOpened, setIsOpened] = useState(false);
  const breakpoint = useAppSelector(selectBreakpoint);

  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = breakpoint === 'xs' || breakpoint === 'sm' ? 24 : 36;

  const fullArray = Array.from({length: 49});
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visiblePlants = fullArray.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  return (
    <div className={`flex flex-col gap-8 ${props.side === 'right' ? 'items-start' : 'items-end'} relative xl:w-72 2xl:w-93.5`}>
      <Button type={props.buttonType} onClick={() => setIsOpened(!isOpened)}/>
      {isOpened && <>
        {breakpoint === 'xl' ||  breakpoint === '2xl' ? 
        <>
          <Line side={props.side}/>
          <div className="relative z-1 bg-dark-beige rounded-sm p-6 grid grid-cols-3 2xl:grid-cols-4 gap-6 border-3 border-black drop-shadow-3 content-start h-full">
            {visiblePlants.map((plant, index) => (
              <PlantCard key={index} />
            ))}
          </div>
        </>
        : 
        <div className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center">
          <div className="relative bg-dark-beige rounded-sm size-fit m-auto justify-items-center content-start inline-grid p-6 grid-cols-4 md:grid-cols-6 gap-6 border-3 border-black drop-shadow-3">
            {visiblePlants.map((plant, index) => (
              <PlantCard key={index} />
            ))}
            <Button type="arrow" arrowType="prev" className="top-1/2 absolute -translate-y-1/2" onClick={() => setCurrentPage(page => page - 1)} disabled/>
            <Button type="arrow" arrowType="next" className="top-1/2 absolute -translate-y-1/2" onClick={() => setCurrentPage(page => page + 1)}/>
          </div>
        </div>
        }
      </>}
    </div>
  );
};
