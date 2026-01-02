import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://ro-service-engineer-be.onrender.com/api/admin";

const authHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}` };
};

export const fetchRoles = createAsyncThunk(
  "role/fetchAll",
  async ({ search = "" } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`, {
        headers: authHeaders(),
        params: { role: "subAdmin", search },
      });
      if (res.data?.success) return res.data.data || [];
      return rejectWithValue(res.data || { message: "Failed to fetch" });
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchRoleById = createAsyncThunk(
  "role/fetchById",
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

export const addRole = createAsyncThunk(
  "role/add",
  async (payload, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API_URL}/register`, payload, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/subadmin/update/${id}`, data, {
        headers: authHeaders(),
      });
      return res.data?.data || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/delete",
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

export const toggleRoleStatus = createAsyncThunk(
  "role/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/toggle-status/${id}`, {}, {
        headers: authHeaders(),
      });
      const updatedData = res.data?.data || res.data?.role;
      return { id, data: updatedData };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  list: [],
  current: null,
  loading: false,
  error: null,
};

const rolesSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // fetch by id
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // add
      .addCase(addRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.list.unshift(action.payload);
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // update
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        if (updated?._id) {
          state.current = updated;
          const idx = state.list.findIndex((r) => r._id === updated._id);
          if (idx !== -1) state.list[idx] = updated;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // delete
      .addCase(deleteRole.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((r) => r._id !== id);
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.error = action.payload || action.error;
      })
      // toggle status
      .addCase(toggleRoleStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleRoleStatus.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload?.id;
        const data = action.payload?.data;

        if (id && state.current && state.current._id === id) {
          if (data && Object.keys(data).length > 0) {
            state.current = { ...state.current, ...data };
          } else {
            const newStatus = state.current.status === "active" ? "inactive" : "active";
            state.current = { ...state.current, status: newStatus };
          }
        }

        const idx = state.list.findIndex((r) => r._id === id);
        if (idx !== -1) {
          if (data && Object.keys(data).length > 0) {
            state.list[idx] = { ...state.list[idx], ...data };
          } else {
            const newStatus = state.list[idx].status === "active" ? "inactive" : "active";
            state.list[idx] = { ...state.list[idx], status: newStatus };
          }
        }
      })
      .addCase(toggleRoleStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearCurrent } = rolesSlice.actions;
export default rolesSlice.reducer;
