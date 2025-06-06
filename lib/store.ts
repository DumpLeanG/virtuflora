import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { screenSlice } from "./features/screen/screenSlice";
import { gardenSlice } from "./features/garden/gardenSlice";
import { playerSlice } from "./features/player/playerSlice";
import { plantsApi } from "./services/plants/plantsApi";
import { userApi } from "./services/user/userApi";
import { inventoryApi } from "./services/inventory/inventoryApi";

const rootReducer = combineSlices(screenSlice, gardenSlice, playerSlice, plantsApi, userApi, inventoryApi);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(plantsApi.middleware)
        .concat(userApi.middleware)
        .concat(inventoryApi.middleware)
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
