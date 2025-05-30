import Button from "../layout/button/Button";
import Image from "next/image";

interface SettingsItemProps {
  type: "language" | "theme" | "control";
}

export default function SettingsItem({ type } : SettingsItemProps ) {
  return (
    type === "language" ?
    <div className="flex gap-6 md:gap-8 items-center">
        <div className="p-3 md:p-4 rounded-sm bg-background">
            <Image
            className="size-6 md:size-8"
            src="language.svg"
            alt="achievement-icon"
            width={32}
            height={32}/>
        </div>
        <div className="flex-1 relative">
          <select defaultValue="English" className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full">
            <option value="" disabled></option>
            <option value="English">English</option>
            <option value="Russian">Русский</option>
          </select>
          <Image
            className="size-4 absolute right-3 top-1/2 -translate-y-1/2"
            src="select-arrow.svg"
            alt="arrow"
            width={16}
            height={16}/>
        </div>
    </div>
    : type === "theme" ?
    <div className="flex gap-6 md:gap-8 items-center">
        <div className="p-3 md:p-4 rounded-sm bg-background">
            <Image
            className="size-6 md:size-8"
            src="light-theme.svg"
            alt="achievement-icon"
            width={32}
            height={32}/>
        </div>
        <div className="flex-1 relative">
          <input type="range" className="w-full appearance-none rounded-sm bg-none relative z-1 h-9" min="1" max="2" defaultValue="2"/>
          <span className="bg-background border-2 md:border-3 h-9 rounded-sm w-full absolute block top-1/2 -translate-y-1/2" id="pass-length-line"></span>
          <span className="absolute left-3 top-1/2 -translate-y-1/2">Light</span>
        </div>
    </div>
    :
    <div className="flex gap-6 md:gap-8 items-center">
        <div className="p-3 md:p-4 rounded-sm bg-background">
            <Image
            className="size-6 md:size-8"
            src="control.svg"
            alt="achievement-icon"
            width={32}
            height={32}/>
        </div>
        <div className="flex-1 relative">
          <input type="range" className="w-full appearance-none rounded-sm bg-none relative z-1 h-9" min="1" max="2" defaultValue="2"/>
          <span className="bg-background border-2 md:border-3 h-9 rounded-sm w-full absolute block top-1/2 -translate-y-1/2" id="pass-length-line"></span>
          <span className="absolute left-3 top-1/2 -translate-y-1/2">Drag & Drop</span>
        </div>
    </div>
  );
};
