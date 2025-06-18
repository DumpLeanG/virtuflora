import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LanguageSlice { 
  current: string
};

const initialState: LanguageSlice = {
  current: 'en'
};

export const languageSlice = createAppSlice({
  name: "language",
  initialState,
  reducers: { 
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.current = action.payload;

      if (typeof window !== 'undefined') {
        localStorage.setItem('app-lang', action.payload);
      }
    },
  }
});

export const { setCurrentLanguage } = languageSlice.actions;