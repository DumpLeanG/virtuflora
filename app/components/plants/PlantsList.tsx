'use client';

import PlantCard from "./PlantCard";
import Line from "./Line";
import Button from "../layout/button/Button";
import { useState } from "react";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

export default function PlantsList(props: {side: 'right' | 'left', buttonType: 'inventory' | 'shop'}) {
  const [isOpened, setIsOpened] = useState(false);
  const widthBP = useAppSelector(selectWidthBreakpoint);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpened(false));

  const [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = widthBP === 'xs' || widthBP === 'sm' ? 24 : widthBP === 'md' || widthBP === 'lg' ? 36 : widthBP === 'xl' ? 15 : 20;

  const fullArray = Array.from({length: 49});
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visiblePlants = fullArray.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  return (
    <div className={`flex flex-col gap-8 ${props.side === 'right' ? 'items-start' : 'items-end'} relative xl:w-72 2xl:w-93.5`}>
      <Button type={props.buttonType} onClick={() => setIsOpened(!isOpened)}/>
      {isOpened && <>
        {widthBP === 'xl' ||  widthBP === '2xl' ? 
        <>
          <Line side={props.side}/>
          <div className="flex flex-col gap-6 relative z-1 bg-dark-beige rounded-sm p-6 border-3 border-black drop-shadow-2 md:drop-shadow-3 h-full justify-between">
            <div className="grid grid-cols-3 2xl:grid-cols-4 gap-6 content-start">
              {visiblePlants.map((plant, index) => (
                <PlantCard key={index} />
              ))}
            </div>
              <div className="flex justify-center gap-6">
                <Button type="arrow" arrowType="prev" className="relative bg-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
                <Button type="arrow" arrowType="next" className="relative bg-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(fullArray.length / itemsPerPage)}/>
              </div>
          </div>
        </>
        : 
        <div className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
          <div ref={ref} className="relative bg-dark-beige rounded-sm size-fit justify-items-center content-start inline-grid p-6 grid-cols-4 md:grid-cols-6 gap-6 border-3 border-black drop-shadow-2 md:drop-shadow-3">
            {visiblePlants.map((plant, index) => (
              <PlantCard key={index} />
            ))}
            <Button type="arrow" arrowType="prev" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
            <Button type="arrow" arrowType="next" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(fullArray.length / itemsPerPage)}/>
          </div>
        </div>
        }
      </>}
    </div>
  );
};
