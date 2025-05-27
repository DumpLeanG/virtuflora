import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type WidthBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type HeightBreakpoint = 'h-sm' | 'h-lg';

type ScreenState = { 
  widthBreakpoint: WidthBreakpoint;
  heightBreakpoint: HeightBreakpoint;
};

const initialState: ScreenState = {
  widthBreakpoint: 'xs',
  heightBreakpoint: 'h-lg'
};

export const screenSlice = createAppSlice({
  name: "screen",
  initialState,
  reducers: {
    setWidthBreakpoint: (state, action: PayloadAction<WidthBreakpoint>) => {
      state.widthBreakpoint= action.payload;
    },
    setHeightBreakpoint: (state, action: PayloadAction<HeightBreakpoint>) => {
      state.heightBreakpoint = action.payload;
    }
  },
  selectors: {
    selectWidthBreakpoint: (screen) => screen.widthBreakpoint,
    selectHeightBreakpoint: (screen) => screen.heightBreakpoint,
  }
});

export const { setWidthBreakpoint, setHeightBreakpoint } = screenSlice.actions;
export const { selectWidthBreakpoint, selectHeightBreakpoint } = screenSlice.selectors;
export default screenSlice.reducer;