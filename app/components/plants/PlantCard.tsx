import Image from "next/image";

export default function PlantCard() {

  return (
    <div className="flex flex-col">
        <div className="bg-background rounded-sm p-3 border-3 border-black flex items-center justify-center drop-shadow-2">
            <Image
            className="size-7 md:size-8 object-contain"
            src="/cucumber.svg"
            alt="cucumber"
            width={36}
            height={36}
            priority 
            />
        </div>
        <span className="text-sm rounded-sm bg-background border-3 border-black drop-shadow-2 text-center">x10</span>
    </div>
  );
};
