"use client";

import { useState } from "react";

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
  selectStatus,
} from "@/lib/features/counter/counterSlice";
import GardenBed from "./GardenBed";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Garden() {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-beige rounded-sm p-8 grid grid-cols-6 grid-rows-6 gap-8 size-fit border-3 border-black drop-shadow-3">
      {Array.from({length: 36}).map((bed, index) => (
        <GardenBed key={index} />
      ))}
    </div>
  );
};
