'use client';

import Button from "../layout/button/Button";
import { useState } from "react";
import Achievement from "./Achievement";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectHeightBreakpoint, selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";

interface AchievementsProps {
  handleOutsideClick: () => void;
}

export default function Achievements({ handleOutsideClick } : AchievementsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useOutsideClick<HTMLUListElement>(() => {
      handleOutsideClick();
  })

  const heightBP = useAppSelector(selectHeightBreakpoint);
  const widthBP = useAppSelector(selectWidthBreakpoint);
  let itemsPerPage = heightBP === 'h-sm' && (widthBP !== 'xs' && widthBP !== 'sm') ? 2 : 3;

  const fullArray = Array.from({length: 7});
  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visibleAchievements = fullArray.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  return (
    <div  className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
      <div className="relative">
        <ul ref={ref} className="p-6 md:p-8 border-2 md:border-3 border-black rounded-sm bg-beige w-80 md:w-155 drop-shadow-2 md:drop-shadow-3 flex flex-col gap-6 md:gap-8">
          {visibleAchievements.map((achievement, index) => (
            <Achievement key={index}/>
          ))}
        </ul>
        <Button type="arrow" arrowType="prev" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
        <Button type="arrow" arrowType="next" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(fullArray.length / itemsPerPage)}/>
      </div>
      
    </div>
  );
};
