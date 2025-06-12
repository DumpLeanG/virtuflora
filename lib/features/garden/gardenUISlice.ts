import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GardenPlant, PlantBase } from "@/lib/types/plants";

interface GardenUIState { 
  selectedPlant: PlantBase | null;
  isPlanting: boolean;
};

const initialState: GardenUIState = {
  selectedPlant: null,
  isPlanting: false
};

export const gardenUISlice = createAppSlice({
  name: "gardenUI",
  initialState,
  reducers: { 
    selectPlant: (state, action: PayloadAction<PlantBase>) => {
      state.selectedPlant = action.payload;
    },
    cancelPlanting: (state) => {
      state.selectedPlant = null;
    },
    resetAfterPlanting: (state) => {
      state.selectedPlant = null;
    },
    startPlanting: (state) => {
      state.isPlanting = true;
    },
    endPlanting: (state) => {
      state.isPlanting = false;
    },
  }
});

export const { selectPlant, cancelPlanting, resetAfterPlanting, startPlanting, endPlanting } = gardenUISlice.actions;