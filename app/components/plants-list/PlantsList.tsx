"use client";

import { useState } from "react";
import PlantCard from "./PlantCard";

export default function PlantsList() {

  return (
    <div className="bg-dark-beige rounded-sm p-6 grid grid-cols-3 gap-6 border-3 border-black drop-shadow-3 content-start h-full">
      {Array.from({length: 7}).map((plant, index) => (
        <PlantCard key={index} />
      ))}
    </div>
  );
};
