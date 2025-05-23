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

  return (
     <div className={`hidden md:flex flex-col gap-8 ${props.side === 'right' ? 'items-start' : 'items-end'} relative xl:w-72 2xl:w-93.5`}>
      {breakpoint !== 'sm' && <Button className="hidden md:block" type={props.buttonType} onClick={() => setIsOpened(!isOpened)}/>}
      {isOpened && <>
        <Line side={props.side}/>
        <div className="relative z-1 bg-dark-beige rounded-sm p-6 grid lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-6 border-3 border-black drop-shadow-3 content-start h-full">
          {Array.from({length: 7}).map((plant, index) => (
            <PlantCard key={index} />
          ))}
        </div>
      </>}
    </div>
  );
};
