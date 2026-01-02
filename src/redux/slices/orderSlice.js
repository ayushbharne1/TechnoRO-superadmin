import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ro-service-engineer-be.onrender.com/api";

/* ============================
   GET ALL ORDERS (ADMIN)
============================ */
export const getAllOrders = createAsyncThunk(
    "order/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            //   const token = localStorage.getItem("token");
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(`${BASE_URL}/admin/order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data; // full response
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch orders"
            );
        }
    }
);

/* ============================
   GET ORDER BY ID (ADMIN)
============================ */
export const getOrderById = createAsyncThunk(
    "order/getOrderById",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const res = await axios.get(`${BASE_URL}/admin/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return res.data.data; // 👈 only order object
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch order"
            );
        }
    }
);

/* ============================
   ASSIGN ORDER (ADMIN)
============================ */
export const assignOrder = createAsyncThunk(
    "order/assignOrder",
    async ({ orderId, manufacturerId, vendorId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("adminToken");

            const body = manufacturerId
                ? { orderId, manufacturerId }
                : { orderId, vendorId };

            const res = await axios.put(
                `${BASE_URL}/admin/order/assign-order`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            return res.data.order; // 👈 updated order
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to assign order"
            );
        }
    }
);





/* ============================
   SLICE
============================ */
const orderSlice = createSlice({
    name: "order",
    initialState: {
        list: [],
        singleOrder: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data; // 👈 only array
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleOrder = action.payload; // 👈 single order
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* ============================
                ASSIGN ORDER
            ============================ */
            .addCase(assignOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(assignOrder.fulfilled, (state, action) => {
                state.loading = false;

                // update order in list
                const index = state.list.findIndex(
                    (o) => o._id === action.payload._id
                );
                if (index !== -1) {
                    state.list[index] = action.payload;
                }

                // update single order if opened
                if (state.singleOrder?._id === action.payload._id) {
                    state.singleOrder = action.payload;
                }
            })
            .addCase(assignOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },
});

export default orderSlice.reducer;
