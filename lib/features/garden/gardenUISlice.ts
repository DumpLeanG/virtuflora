import { createAppSlice } from "@/lib/createAppSlice";
import { GrowthStage } from "@/lib/types/plants";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GardenUIState { 
  selectedGardenPlant: {
    id: number;
    name: string;
    growthStage: GrowthStage;
    gardenPlantId: number;
    waterCount: number;
    lastWatered: Date | null;
  } | null
};

const initialState: GardenUIState = {
  selectedGardenPlant: null,
};

export const gardenUISlice = createAppSlice({
  name: "gardenUI",
  initialState,
  reducers: { 
    setSelectedGardenPlant: (state, action: PayloadAction<GardenUIState['selectedGardenPlant']>) => {
      state.selectedGardenPlant = action.payload;
    },
    cancelGardenPlantSelecting: (state) => {
      state.selectedGardenPlant = null;
    },
    resetAfterActivity: (state) => {
      state.selectedGardenPlant = null;
    },
  }
});

export const { setSelectedGardenPlant, cancelGardenPlantSelecting, resetAfterActivity } = gardenUISlice.actions;
