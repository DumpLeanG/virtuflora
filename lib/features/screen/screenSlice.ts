import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ScreenState = { breakpoint: Breakpoint };

const initialState: ScreenState = {
  breakpoint: 'xs'
};

export const screenSlice = createAppSlice({
  name: "screen",
  initialState,
  reducers: {
    setBreakpoint: (state, action: PayloadAction<Breakpoint>) => {
      state.breakpoint = action.payload;
    }
  },
  selectors: {
    selectBreakpoint: (screen) => screen.breakpoint,
  }
});

export const { setBreakpoint } = screenSlice.actions;
export const { selectBreakpoint } = screenSlice.selectors;
export default screenSlice.reducer;