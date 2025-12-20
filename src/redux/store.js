import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../redux/slices/authslice";
import adminAuthReducer from "../redux/slices/authslice"
export const store = configureStore({
  reducer: {
    // auth: authReducer,
     adminAuth: adminAuthReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});
