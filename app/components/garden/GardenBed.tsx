"use client";

import Image from "next/image";

export default function GardenBed() {

  return (
    <div className="bg-dark-beige rounded-sm p-1 border-3 border-black flex items-center justify-center">
      <Image
      className="size-11 object-contain"
      src="/potato-growth-1.svg"
      alt="potato-growth-1"
      width={52}
      height={52}
      priority 
      />
    </div>
  );
};
