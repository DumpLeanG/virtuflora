import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GrowingPlant } from "@/lib/types/plants";

export interface GardenBed {
  id: string;
  plant: GrowingPlant | null;
}

interface GardenState { 
  beds: GardenBed[];
  selectedPlant: GrowingPlant | null;
  isPlanting: boolean;
};

const initialState: GardenState = {
  beds: Array.from({ length: 36 }, (bed, index) => ({
    id: `bed-${index}`,
    plant: null
  })),
  selectedPlant: null,
  isPlanting: false,
};

export const gardenSlice = createAppSlice({
  name: "garden",
  initialState,
  reducers: { 
    selectPlant: (state, action: PayloadAction<GrowingPlant>) => {
      state.selectedPlant = action.payload;
      state.isPlanting = true;
    },
    cancelPlanting: (state) => {
      state.selectedPlant = null;
      state.isPlanting = false;
    },
    plantOnBed: (state, action: PayloadAction<GardenBed['id']>) => {
      const bedId = action.payload;
      const bed = state.beds.find(b => b.id === bedId);
      if (bed && !bed.plant && state.selectedPlant) {
        bed.plant = state.selectedPlant;
        state.selectedPlant = null;
        state.isPlanting = false;
      }
    },
  }
});

export const { selectPlant, cancelPlanting, plantOnBed } = gardenSlice.actions;
export default gardenSlice.reducer;