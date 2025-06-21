'use client';

import Button from "../layout/button/Button";
import { useState } from "react";
import Achievement from "./Achievement";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectHeightBreakpoint, selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useLanguages } from "@/lib/hooks/useLanguages";
import { useGetAchievementsQuery } from "@/lib/services/achievements/achievementsApi";
import { selectCurrentUserId } from "@/lib/services/user/userApi";

interface AchievementsProps {
  handleOutsideClick: () => void;
}

export default function Achievements({ handleOutsideClick } : AchievementsProps) {
  const userId = useAppSelector(selectCurrentUserId);
  const { data: achievements = [] } = useGetAchievementsQuery(userId);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useOutsideClick<HTMLDivElement>(() => {
      handleOutsideClick();
  })

  const heightBP = useAppSelector(selectHeightBreakpoint);
  const widthBP = useAppSelector(selectWidthBreakpoint);
  let itemsPerPage = heightBP === 'h-sm' || widthBP === 'xs' || widthBP === 'sm' ? 2 : 3;

  const pageFirstIndex = (currentPage - 1) * itemsPerPage;
  const visibleAchievements = achievements.slice(pageFirstIndex, pageFirstIndex + itemsPerPage);

  const lang = useLanguages();

  return (
    <div  className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
      <div  ref={ref} className="relative flex flex-col items-center gap-6 md:gap-8 p-6 md:p-8 border-2 md:border-3 border-black rounded-sm bg-beige w-80 md:w-155 drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
        <div className="flex gap-8 w-full items-center">
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
          <h2 className="text-green text-stroke-2 md:text-stroke-3 text-stroke-black text-lg md:text-2xl drop-shadow-2 drop-shadow-black">{lang("achievements")}</h2>
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
        </div>
        <ul className="w-full flex flex-col gap-6 md:gap-8">
          {visibleAchievements.map((achievement) => (
            <Achievement achievement={achievement} key={achievement.id}/>
          ))}
        </ul>
        <Button type="arrow" arrowType="prev" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page - 1)} disabled={currentPage === 1}/>
        <Button type="arrow" arrowType="next" isAbsolute className="top-1/2 absolute -translate-y-1/2 bg-dark-beige" onClick={() => setCurrentPage(page => page + 1)} disabled={currentPage === Math.ceil(achievements.length / itemsPerPage)}/>
      </div>
      
    </div>
  );
};
