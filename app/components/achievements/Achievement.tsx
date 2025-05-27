import Button from "../layout/button/Button";
import Image from "next/image";

export default function Achievement( props : {completed?: true | false, disabled?: true | false} ) {

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 p-4 md:p-6 bg-dark-beige border-2 md:border-3 border-black rounded-sm">
        <div className="p-3 md:p-4 rounded-sm bg-background">
            <Image
            className="size-6 md:size-8"
            src="potato.svg"
            alt="achievement-icon"
            width={32}
            height={32}/>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h3>Plant 10 seeds</h3>
          <div className="flex gap-4 md:gap-6 items-center relative">
            <div className="bg-background border-2 md:border-3 border-black rounded-sm w-full">
              <span className="w-1/2 p-2 md:p-3 bg-green block"></span>
            </div>
            <span className="absolute md:static left-1/2 -translate-x-1/2 md:translate-0">100/100</span>
          </div>
        </div>
        <div className="w-full p-4 md:p-6 flex bg-background rounded-sm justify-between items-center">
          <div className="flex gap-4 md:gap-6">
            <span>100$</span>
            <span>50 XP</span>
          </div>
          <Button type="claim" completed={props.completed} disabled={props.disabled}/>
        </div>
    </div>
  );
};
