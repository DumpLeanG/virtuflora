'use client';

import Button from "../layout/button/Button";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import SettingsItem from "./SettingsItem";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { logout } from "@/lib/features/player/playerSlice";
import { supabase } from "@/lib/supabase/supabaseClient";

interface SettingsProps {
  handleOutsideClick: () => void;
}

export default function Settings({ handleOutsideClick } : SettingsProps) {
  const dispatch = useAppDispatch();
  const ref = useOutsideClick<HTMLDivElement>(() => {
      handleOutsideClick();
  })

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logout());
  }

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-black/70 p-4 z-2 flex items-center justify-center">
      <div ref={ref} className="relative flex flex-col gap-6 md:gap-8 p-6 md:p-8 border-2 md:border-3 border-black rounded-sm bg-beige w-80 md:w-126 drop-shadow-2 md:drop-shadow-3 drop-shadow-black">
        <div className="flex gap-8 w-full items-center">
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
          <h2 className="text-green text-stroke-2 md:text-stroke-3 text-stroke-black text-lg md:text-2xl drop-shadow-2 drop-shadow-black">Settings</h2>
          <span className="w-full h-[2px] md:h-[3px] bg-black rounded-sm"></span>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 w-full">
            <SettingsItem type="language"/>
            <SettingsItem type="theme"/>
            <SettingsItem type="control"/>
        </div>
        <Button type="exit" onClick={handleLogout}/>
      </div>
    </div>
  );
};
