import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../redux/slices/authslice";
import manufacturerReducer from "./slices/manufacturerSlice";
import popularCitiesReducer from "./slices/popularCitiesSlice";
import vendorReducer from "./slices/vendorSlice";
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    adminAuth: adminAuthReducer,
    manufacturer: manufacturerReducer,
    popularCities: popularCitiesReducer,
    vendor: vendorReducer
  },
  devTools: import.meta.env.MODE !== "production",
});
