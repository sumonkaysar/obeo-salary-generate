import salaryGenerateReducer from "@/Features/Payroll/payrollSlices/SalaryGenerate.slice";
import { baseApi } from "@/Redux/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    salaryGenerate: salaryGenerateReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["candidateSelection/updateTableState"],
        ignoredActionPaths: ["payload.updater"],
      },
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
