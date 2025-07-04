import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { screenSlice } from "./features/screen/screenSlice";
import { inventoryUISlice } from "./features/inventory/inventoryUISlice";
import { plantsApi } from "./services/plants/plantsApi";
import { userApi } from "./services/user/userApi";
import { inventoryApi } from "./services/inventory/inventoryApi";
import { gardenApi } from "./services/garden/gardenApi";
import { gardenUISlice } from "./features/garden/gardenUISlice";
import { languageSlice } from "./features/language/languageSlice";
import { achievementsApi } from "./services/achievements/achievementsApi";

const rootReducer = combineSlices(screenSlice, inventoryUISlice, gardenUISlice, languageSlice, plantsApi, userApi, inventoryApi, gardenApi, achievementsApi);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(plantsApi.middleware)
        .concat(userApi.middleware)
        .concat(inventoryApi.middleware)
        .concat(gardenApi.middleware)
        .concat(achievementsApi.middleware)
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
