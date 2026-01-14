import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://ro-service-engineer-be.onrender.com/api/admin/manufacturer";

const authHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}` };
};

export const fetchManufacturers = createAsyncThunk(
  "manufacturer/fetchAll",
  async ({ search = "", limit = 10000 } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`, {
        headers: authHeaders(),
        params: { search, limit },
      });
      if (res.data?.success) return res.data.data || [];
      return rejectWithValue(res.data || { message: "Failed to fetch" });
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchManufacturerById = createAsyncThunk(
  "manufacturer/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/details/${id}`, {
        headers: authHeaders(),
      });
      if (res.data?.success) return res.data.data;
      return rejectWithValue(res.data || { message: "Not found" });
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const addManufacturer = createAsyncThunk(
  "manufacturer/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/create`, payload, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const updateManufacturer = createAsyncThunk(
  "manufacturer/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/update/${id}`, data, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const deleteManufacturer = createAsyncThunk(
  "manufacturer/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`, {
        headers: authHeaders(),
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const toggleManufacturerStatus = createAsyncThunk(
  "manufacturer/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${API_URL}/toggle-status/${id}`,
        {},
        {
          headers: authHeaders(),
        }
      );
      const updatedData = res.data?.data || res.data?.manufacturer;
      return { id, data: updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const toggleManufacturerVerification = createAsyncThunk(
  "manufacturer/toggleVerification",
  async ({ id, action }, { rejectWithValue }) => {
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
        res?.data?.data?.manufacturer?.isAccountVerified ??
        null;

      return {
        id,
        isAccountVerified,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const manufacturerSlice = createSlice({
  name: "manufacturer",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchManufacturers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManufacturers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchManufacturers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // fetch by id
      .addCase(fetchManufacturerById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchManufacturerById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchManufacturerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // add
      .addCase(addManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(addManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // update
      .addCase(updateManufacturer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManufacturer.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated?._id) {
          state.current = updated;
          const idx = state.list.findIndex((m) => m._id === updated._id);
          if (idx !== -1) state.list[idx] = updated;
        }
      })
      .addCase(updateManufacturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // delete
      .addCase(deleteManufacturer.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteManufacturer.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((m) => m._id !== id);
      })
      .addCase(deleteManufacturer.rejected, (state, action) => {
        state.error = action.payload || action.error;
      })
      // toggle status
      .addCase(toggleManufacturerStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleManufacturerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        const data = action.payload?.data;

        if (id && state.current && state.current._id === id) {
          if (data && Object.keys(data).length > 0) {
            state.current = { ...state.current, ...data };
          } else {
            const newStatus =
              state.current.status === "active" ? "inactive" : "active";
            state.current = { ...state.current, status: newStatus };
          }
        }

        const idx = state.list.findIndex((m) => m._id === id);
        if (idx !== -1) {
          if (data && Object.keys(data).length > 0) {
            state.list[idx] = { ...state.list[idx], ...data };
          } else {
            const newStatus =
              state.list[idx].status === "active" ? "inactive" : "active";
            state.list[idx] = { ...state.list[idx], status: newStatus };
          }
        }
      })
      .addCase(toggleManufacturerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // toggle verification
      .addCase(toggleManufacturerVerification.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleManufacturerVerification.fulfilled, (state, action) => {
        state.loading = false;
        const { id, isAccountVerified } = action.payload;

        if (state.current && state.current._id === id) {
          state.current.isAccountVerified = isAccountVerified;
        }

        const idx = state.list.findIndex((m) => m._id === id);
        if (idx !== -1) {
          state.list[idx].isAccountVerified = isAccountVerified;
        }
      })
      .addCase(toggleManufacturerVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearCurrent } = manufacturerSlice.actions;
export default manufacturerSlice.reducer;
