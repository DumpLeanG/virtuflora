import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlantBase, PlantSelection } from "@/lib/types/plants";

interface InventoryUIState { 
  selectedPlant: PlantSelection | null;
  isPlanting: boolean;
  isInventoryOpened: boolean;
  isShopOpened: boolean;
};

const initialState: InventoryUIState = {
  selectedPlant: null,
  isPlanting: false,
  isInventoryOpened: false,
  isShopOpened: false,
};

export const inventoryUISlice = createAppSlice({
  name: "inventoryUI",
  initialState,
  reducers: { 
    setSelectedPlant: (state, action: PayloadAction<PlantSelection>) => {
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
    openInventory: (state) => {
      state.isInventoryOpened = true;
    },
    closeInventory: (state) => {
      state.isInventoryOpened = false;
    },
  }
});

export const { setSelectedPlant, cancelPlanting, resetAfterPlanting, startPlanting, endPlanting, openInventory, closeInventory } = inventoryUISlice.actions;