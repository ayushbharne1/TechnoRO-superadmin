import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin/vendor";

const authHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}` };
};

export const fetchVendors = createAsyncThunk(
  "vendor/fetchAll",
  async ({ search = "" } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, {
        headers: authHeaders(),
        params: { search },
      });
      if (res.data?.success) return res.data.data || [];
      return rejectWithValue(res.data || { message: "Failed to fetch" });
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchVendorById = createAsyncThunk(
  "vendor/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: authHeaders(),
      });
      if (res.data?.success) return res.data.data;
      return rejectWithValue(res.data || { message: "Not found" });
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const addVendor = createAsyncThunk(
  "vendor/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, payload, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const toggleVendorStatus = createAsyncThunk(
  "vendor/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/toggle-status/${id}`, {}, {
        headers: authHeaders(),
      });
      const updatedData = res.data?.data || res.data?.vendor;
      return { id, data: updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);
export const toggleVendorVerification = createAsyncThunk(
  "vendor/toggleVerification",
  async ({id , action}, {rejectWithValue}) => {
    try {
      const res = await axios.patch(
        `${API_URL}/toggle-verification/${id}/${action}`,
        {},
        { headers: authHeaders() }
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
  }
)

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // fetch by id
      .addCase(fetchVendorById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchVendorById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchVendorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // add
      .addCase(addVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVendor.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(addVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // update
      .addCase(updateVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVendor.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated?._id) {
          state.current = updated;
          const idx = state.list.findIndex((v) => v._id === updated._id);
          if (idx !== -1) state.list[idx] = updated;
        }
      })
      .addCase(updateVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // toggle status
      .addCase(toggleVendorStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVendorStatus.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        const data = action.payload?.data;

        // If API returned updated data, use it; otherwise toggle status locally
        if (id && state.current && state.current._id === id) {
          if (data && Object.keys(data).length > 0) {
            state.current = { ...state.current, ...data };
          } else {
            const newStatus = state.current.status === "active" ? "inactive" : "active";
            state.current = { ...state.current, status: newStatus };
          }
        }

        // Update in list
        const idx = state.list.findIndex((v) => v._id === id);
        if (idx !== -1) {
          if (data && Object.keys(data).length > 0) {
            state.list[idx] = { ...state.list[idx], ...data };
          } else {
            const newStatus = state.list[idx].status === "active" ? "inactive" : "active";
            state.list[idx] = { ...state.list[idx], status: newStatus };
          }
        }
      })
      .addCase(toggleVendorStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // toggle verification
      .addCase(toggleVendorVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleVendorVerification.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        const isAccountVerified = action.payload?.isAccountVerified;

        // If API returned updated data, use it; otherwise toggle status locally
        if (id && state.current && state.current._id === id) {
          state.current = { ...state.current, isAccountVerified };
        }

        // Update in list
        const idx = state.list.findIndex((v) => v._id === id);
        if (idx !== -1) {
          state.list[idx] = { ...state.list[idx], isAccountVerified };
        }
      })
      .addCase(toggleVendorVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearCurrent } = vendorSlice.actions;
export default vendorSlice.reducer;
