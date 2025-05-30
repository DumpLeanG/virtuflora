'use client';

import GardenBed from "./GardenBed";
import Button from "../layout/button/Button";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useState } from "react";

export default function Garden() {
  const widthBP = useAppSelector(selectWidthBreakpoint);
  const [currentPage, setCurrentPage] = useState(1);
  const { beds } = useAppSelector((state) => state.garden);
  const balance = useAppSelector((state) => state.player.balance);

  const itemsPerPage = 24;
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visibleBeds = beds.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full md:w-auto">
      <div className="relative max-w-full mx-auto justify-items-center bg-beige rounded-sm p-6 md:p-8 inline-grid grid-cols-4 sm:grid-cols-[repeat(auto-fit,minmax(48px,48px))] md:grid-cols-6 gap-6 md:gap-8 border-2 md:border-3 border-black drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
        {widthBP !== 'xs' ? beds.map((bed) => (
          <GardenBed key={bed.id} id={bed.id} plant={bed.plant} />
        ))
        :
        visibleBeds.map((bed) => (
          <GardenBed key={bed.id} id={bed.id} plant={bed.plant} />
        ))}
        
        {widthBP === 'xs' && (
          <>
            <Button 
              type="arrow" 
              isAbsolute 
              arrowType="prev" 
              className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" 
              onClick={() => setCurrentPage(page => page - 1)} 
              disabled={currentPage === 1}
            />
            <Button 
              type="arrow" 
              isAbsolute 
              arrowType="next" 
              className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" 
              onClick={() => setCurrentPage(page => page + 1)} 
              disabled={currentPage === Math.ceil(beds.length / itemsPerPage)}
            />
          </>
        )}
      </div>
      
      <div className="flex gap-8 items-center">
        {widthBP !== 'xs' && <Button type="water" disabled />}
        <span className="p-2 md:p-3 w-full border-2 md:border-3 border-black rounded-sm bg-dark-beige text-center drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
          Lvl: 30 | Money: {balance}$
        </span>
        {widthBP !== 'xs' && <Button type="dig" disabled />}
      </div>
    </div>
  );
};
