'use client';

import Button from "../layout/button/Button";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import SettingsItem from "./SettingsItem";
import { useLogoutMutation } from "@/lib/services/user/userApi";
import { useRouter } from "next/navigation";
import { useLanguages } from "@/lib/hooks/useLanguages";

interface SettingsProps {
  handleOutsideClick: () => void;
}

export default function Settings({ handleOutsideClick } : SettingsProps) {
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const ref = useOutsideClick<HTMLDivElement>(() => {
      handleOutsideClick();
  });
  
  const lang = useLanguages();

  const handleLogout = async () => {
    try {
    await logout();
    router.push("/");
  } catch (error) {
    console.error('Failed to logout. Please try again.');
  }
  }

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
      <div ref={ref} className="relative flex flex-col gap-6 md:gap-8 p-6 md:p-8 border-2 md:border-3 border-black rounded-sm bg-beige w-80 md:w-126 drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
        <div className="flex gap-8 w-full items-center">
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
          <h2 className="text-green text-stroke-2 md:text-stroke-3 text-stroke-black text-lg md:text-2xl drop-shadow-2 drop-shadow-black">{lang("settings")}</h2>
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 w-full">
            <SettingsItem type="language"/>
            <SettingsItem type="theme"/>
        </div>
        <Button type="exit" onClick={handleLogout}/>
      </div>
    </div>
  );
};
