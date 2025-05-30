import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InventoryItem, ShopItem } from "@/lib/types/plants";

interface PlayerState {
  balance: number;
  inventory: InventoryItem[];
}

const initialState: PlayerState = {
  balance: 100,
  inventory: [
    
  ],
};

export const playerSlice = createAppSlice({
  name: "player",
  initialState,
  reducers: {
    buyPlant: (state, action: PayloadAction<InventoryItem & ShopItem>) => {
      const { name, rarity, price, amount } = action.payload;
      if (state.balance >= price) {
        state.balance -= price;
        const plantIndex = state.inventory.findIndex(p => p.name === name);
        if (plantIndex !== -1) {
          state.inventory[plantIndex].amount += 1;
        } else {
          state.inventory.push({
            name,
            rarity,
            amount,
          })
        }
      }
    },
    decreasePlantAmount: (state, action: PayloadAction<InventoryItem['name']>) => {
      const plantName = action.payload;
      const plantIndex = state.inventory.findIndex(p => p.name === plantName);
      if (plantIndex !== -1 && state.inventory[plantIndex].amount > 0) {
        state.inventory[plantIndex].amount -= 1;
      }
    },
    addMoney: (state, action: PayloadAction<PlayerState['balance']>) => {
      state.balance += action.payload;
    },
  }
});

export const { buyPlant, decreasePlantAmount, addMoney } = playerSlice.actions;
export default playerSlice.reducer;