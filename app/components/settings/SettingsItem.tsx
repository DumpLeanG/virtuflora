import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setCurrentLanguage } from "@/lib/features/language/languageSlice";
import { useLanguages } from "@/lib/hooks/useLanguages";

interface SettingsItemProps {
  type: "language";
}

export default function SettingsItem({ type } : SettingsItemProps ) {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.language.current);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentLanguage(e.target.value));
  };

  const lang = useLanguages();

  return (
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
          <select value={currentLanguage} onChange={handleLanguageChange} className="border-2 md:border-3 p-2 rounded-sm bg-background appearance-none w-full">
            <option value="" disabled></option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
          <Image
            className="size-4 absolute right-3 top-1/2 -translate-y-1/2"
            src="select-arrow.svg"
            alt="arrow"
            width={16}
            height={16}/>
        </div>
    </div>
  );
};
