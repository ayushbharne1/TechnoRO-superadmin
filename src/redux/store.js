import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../redux/slices/authslice";
import manufacturerReducer from "./slices/manufacturerSlice";
import popularCitiesReducer from "./slices/popularCitiesSlice";
import vendorReducer from "./slices/vendorSlice";
import serviceEngineerReducer from "../redux/slices/serviceEngineerSlice";
import serviceReducer from "./slices/serviceSlice";
import productReducer from "./slices/productSlice";
import adminProfileReducer from "../redux/slices/adminProfileSlice";
import leadReducer from "../redux/slices/leadSlice";
import rolesReducer from "./slices/rolesSlice";
import orderReducer from "../redux/slices/orderSlice";
import categoryReducer from "../redux/slices/CategorySlice"; 
import serviceRequestReducer from '../redux/slices/serviceRequestSlice';

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    manufacturer: manufacturerReducer,
    popularCities: popularCitiesReducer,
    vendor: vendorReducer,
    serviceEngineer: serviceEngineerReducer,
    service: serviceReducer,
    products: productReducer,
    adminProfile: adminProfileReducer,
    leads: leadReducer,
    role: rolesReducer,
    order: orderReducer,
    category: categoryReducer, // Add this line
    serviceRequest: serviceRequestReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});