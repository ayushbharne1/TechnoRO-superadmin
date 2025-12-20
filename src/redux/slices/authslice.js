import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* =====================
   BASE URL (SAME FILE)
===================== */
const BASE_URL = "https://ro-service-engineer-be.onrender.com";

/* =====================
   API ENDPOINTS
===================== */
const LOGIN_API = `${BASE_URL}/api/admin/login`;
const FORGOT_API = `${BASE_URL}/api/admin/forgot-pass/send-otp`;
const VERIFY_OTP_API = `${BASE_URL}/api/admin/forgot-pass/verify-otp`;
const RESET_PASS_API = `${BASE_URL}/api/admin/reset-pass`;



/* =====================
   LOGIN
===================== */
export const adminLogin = createAsyncThunk(
    "adminAuth/login",
    async ({ mobile, password }, { rejectWithValue }) => {
        try {
            const res = await axios.post(LOGIN_API, { mobile, password });
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Login failed"
            );
        }
    }
);

/* =====================
   FORGOT PASSWORD
===================== */
export const sendForgotOtp = createAsyncThunk(
    "adminAuth/sendForgotOtp",
    async ({ mobile }, { rejectWithValue }) => {
        try {
            const res = await axios.post(FORGOT_API, { mobile });

            if (!res.data.success) {
                return rejectWithValue(res.data.message || "Failed to send OTP");
            }

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to send OTP"
            );
        }
    }
);

// for verify 
/* =====================
   VERIFY OTP
===================== */
export const verifyForgotOtp = createAsyncThunk(
    "adminAuth/verifyForgotOtp",
    async ({ mobile, otp }, { rejectWithValue }) => {
        try {
            const res = await axios.post(VERIFY_OTP_API, {
                mobile,
                otp,
            });

            if (!res.data.success) {
                return rejectWithValue(res.data.message || "Invalid OTP");
            }

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

/* =====================
   RESET PASSWORD
===================== */
export const resetPassword = createAsyncThunk(
    "adminAuth/resetPassword",
    async ({ mobile, newPassword }, { rejectWithValue }) => {
        try {
            const res = await axios.post(RESET_PASS_API, {
                mobile,
                newPassword,
            });

            if (!res.data.success) {
                return rejectWithValue(
                    res.data.message || "Failed to reset password"
                );
            }

            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Reset password failed"
            );
        }
    }
);



/* =====================
   SLICE
===================== */
const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState: {
        token: localStorage.getItem("adminToken"),
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem("adminToken"),
    },
    reducers: {
        // adminLogout: (state) => {
        //     state.token = null;
        //     state.isAuthenticated = false;
        //     localStorage.removeItem("adminToken");
        // },
        adminLogout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;

            // 🔥 clear storage completely
            localStorage.removeItem("adminToken");
        },

        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // LOGIN
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem("adminToken", action.payload.token);
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FORGOT PASSWORD
            .addCase(sendForgotOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendForgotOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendForgotOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // VERIFY OTP
            .addCase(verifyForgotOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyForgotOtp.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(verifyForgotOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // RESET PASSWORD
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });




    },

});

export const { adminLogout, clearAuthError } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/login";

// //Login API
// export const adminLogin = createAsyncThunk(
//   "adminAuth/login",
//   async ({ mobile, password }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(API_URL, { mobile, password });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// const adminAuthSlice = createSlice({
//   name: "adminAuth",
//   initialState: {
//     token: null,
//     loading: false,
//     error: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     adminLogout: (state) => {
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("adminToken");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(adminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.token = action.payload.token;
//         localStorage.setItem("adminToken", action.payload.token);
//       })
//       .addCase(adminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { adminLogout } = adminAuthSlice.actions;
// export default adminAuthSlice.reducer;