'use client';

import PlantsList from "./plants/PlantsList";
import Garden from "./garden/Garden";
import { selectBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks";

export default function MainPageBlock() {
  const breakpoint = useAppSelector(selectBreakpoint);

  return (
      <>
        {breakpoint !== 'xs' && <PlantsList side="left" buttonType="inventory"/>}
        <Garden />
        {breakpoint !== 'xs' && <PlantsList side="right" buttonType="shop"/>}
      </>
  );
};
