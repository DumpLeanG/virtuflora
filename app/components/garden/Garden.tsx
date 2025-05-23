'use client';

import GardenBed from "./GardenBed";
import Button from "../layout/button/Button";
import { selectBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function Garden() {
  const breakpoint = useAppSelector(selectBreakpoint);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const fullArray = Array.from({length: 36});
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visibleBeds = fullArray.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-8 w-full md:w-auto">
      <div className="relative max-w-full mx-auto justify-items-center bg-beige rounded-sm p-6 md:p-8 inline-grid grid-cols-[repeat(auto-fit,minmax(48px,48px))] md:grid-cols-6 gap-4 md:gap-6 border-2 md:border-3 border-black drop-shadow-3">
        {breakpoint !== 'sm' ? fullArray.map((bed, index) => (
          <GardenBed key={index} />
        ))
        :
        visibleBeds.map((bed, index) => (
          <GardenBed key={index} />
        ))}
        <Button type="arrow" arrowType="prev" onClick={() => setCurrentPage(page => page - 1)} disabled/>
        <Button type="arrow" arrowType="next" onClick={() => setCurrentPage(page => page + 1)}/>
      </div>
      <div className="flex gap-8 items-center">
        {breakpoint !== 'sm' && <Button type="water" disabled /> }
        <span className="p-2 md:p-3 w-full border-2 md:border-3 border-black rounded-sm bg-dark-beige text-center drop-shadow-3">Lvl: 30 | Money: 1200$</span>
        {breakpoint !== 'sm' && <Button type="dig" disabled /> }
      </div>
    </div>
  );
};
