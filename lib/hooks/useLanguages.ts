'use client';

import { useAppDispatch, useAppSelector } from "./hooks";
import en from "@/lib/languages/en.json"
import ru from "@/lib/languages/ru.json"
import { useEffect, useState } from "react";
import { setCurrentLanguage } from "../features/language/languageSlice";

const languages: Record<string, any> = {
  en,
  ru,
};

export function useLanguages() {
  const dispatch = useAppDispatch();
  const storeLanguage = useAppSelector((state) => state.language.current);

  useEffect(() => {
    const savedLanguage = typeof window !== undefined
    ? localStorage.getItem('app-lang')
    : null;

    if(savedLanguage && savedLanguage !== storeLanguage) {
      dispatch(setCurrentLanguage(savedLanguage));
    }
  }, [storeLanguage])
  
  return (key: string) => {
    return languages[storeLanguage][key] || key;
  };
}