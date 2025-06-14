import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlantBase } from "@/lib/types/plants";

interface InventoryUIState { 
  selectedPlant: PlantBase | null;
  isPlanting: boolean;
};

const initialState: InventoryUIState = {
  selectedPlant: null,
  isPlanting: false
};

export const inventoryUISlice = createAppSlice({
  name: "inventoryUI",
  initialState,
  reducers: { 
    setSelectedPlant: (state, action: PayloadAction<PlantBase>) => {
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

export const { setSelectedPlant, cancelPlanting, resetAfterPlanting, startPlanting, endPlanting } = inventoryUISlice.actions;