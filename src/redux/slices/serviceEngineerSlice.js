// try with add and get all

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
    "https://ro-service-engineer-be.onrender.com/api/admin/engineer";


const authHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
}

export const getAllServiceEngineers = createAsyncThunk(
    "serviceEngineer/getAll",
    async (_,{ rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(BASE_URL, {
               
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch engineers"
            );
        }
    }
);

/* ======================
   ADD SERVICE ENGINEER
====================== */
export const addServiceEngineer = createAsyncThunk(
    "serviceEngineer/add",
    async (engineerData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.post(BASE_URL, engineerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add engineer"
            );
        }
    }
);




/* ===============================
  GET ALL SERVICE ENGINEERS By Id
================================== */

export const getServiceEngineerById = createAsyncThunk(
    "serviceEngineer/getById",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch engineer"
            );
        }
    }
);
/* ======================
   UPDATE SERVICE ENGINEER
====================== */
export const updateServiceEngineer = createAsyncThunk(
    "serviceEngineer/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.put(`${BASE_URL}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update engineer"
            );
        }
    }
);
export const toggleServiceEngineerVerification = createAsyncThunk(
    "serviceEngineer/toggleVerification",
    async ({id , action}, {rejectWithValue}) => {
        try {
            const res = await axios.patch(
                `${BASE_URL}/toggle-verification/${id}/${action}`,
                {},
                {
                    headers: authHeaders(),
                }
            );

            // Normalize possible response shapes from backend
            const isAccountVerified =
                res?.data?.data?.isAccountVerified ??
                res?.data?.isAccountVerified ??
                res?.data?.data?.vendor?.isAccountVerified ??
                null;

            return {
                id,
                isAccountVerified,
            };
        } catch (err) {
            return rejectWithValue(
                err.response?.data || err.message
            )
        }
    })

const serviceEngineerSlice = createSlice({
    name: "serviceEngineer",
    initialState: {
        loading: false,
        success: false,
        error: null,
        list: [], // for GET ALL
        currentEngineer: null,

    },
    reducers: {
        resetEngineerState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ===== ADD ===== */
            .addCase(addServiceEngineer.pending, (state) => {
                state.loading = true;
            })
            .addCase(addServiceEngineer.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(addServiceEngineer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ===== GET ALL ===== */
            .addCase(getAllServiceEngineers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllServiceEngineers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data; // 🔥 backend sends { data: [] }
            })
            .addCase(getAllServiceEngineers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ===== GET BY ID ===== */
            .addCase(getServiceEngineerById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getServiceEngineerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentEngineer = action.payload.data; // 🔥 THIS WAS MISSING
            })
            .addCase(getServiceEngineerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            /* ===== UPDATE ===== */
            .addCase(updateServiceEngineer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateServiceEngineer.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(updateServiceEngineer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //toggle verification
            .addCase(toggleServiceEngineerVerification.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleServiceEngineerVerification.fulfilled, (state, action) => {
                state.loading = false;
                const {id , isAccountVerified} = action.payload;
            })
            .addCase(toggleServiceEngineerVerification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetEngineerState } = serviceEngineerSlice.actions;
export default serviceEngineerSlice.reducer;
