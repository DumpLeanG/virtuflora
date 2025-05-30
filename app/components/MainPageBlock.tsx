'use client';

import PlantsList from "./plants/PlantsList";
import Garden from "./garden/Garden";
import { selectWidthBreakpoint } from "@/lib/features/screen/screenSlice";
import { useAppSelector } from "@/lib/hooks/hooks";

export default function MainPageBlock() {
  const widthBP = useAppSelector(selectWidthBreakpoint);

  return (
      <>
        {widthBP !== 'xs' && <PlantsList side="left" type="inventory"/>}
        <Garden />
        {widthBP !== 'xs' && <PlantsList side="right" type="shop"/>}
      </>
  );
};
