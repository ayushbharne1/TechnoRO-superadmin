import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../redux/slices/authslice";
import manufacturerReducer from "./slices/manufacturerSlice";
import popularCitiesReducer from "./slices/popularCitiesSlice";
import vendorReducer from "./slices/vendorSlice";
import serviceEngineerReducer from "../redux/slices/serviceEngineerSlice" 
import serviceReducer from "./slices/serviceSlice";
import productReducer from './slices/productSlice'; 
import adminProfileReducer from "../redux/slices/adminProfileSlice";
import leadReducer from '../redux/slices/leadSlice'
export const store = configureStore({
  reducer: {
    // auth: authReducer,
    adminAuth: adminAuthReducer,
    manufacturer: manufacturerReducer,
    popularCities: popularCitiesReducer,
    vendor: vendorReducer,
    serviceEngineer: serviceEngineerReducer,
    service: serviceReducer,
    products: productReducer,
    adminProfile: adminProfileReducer,
    leads: leadReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});
