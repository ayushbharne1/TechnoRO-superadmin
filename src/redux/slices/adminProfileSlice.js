import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://ro-service-engineer-be.onrender.com/api/admin";

/* ===============================
   FETCH ADMIN PROFILE
================================ */
export const fetchAdminProfile = createAsyncThunk(
  "adminProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Profile fetch failed");
    }
  }
);

/* ===============================
   UPDATE ADMIN PROFILE
================================ */
// export const updateAdminProfile = createAsyncThunk(
//   "adminProfile/updateProfile",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("adminToken");
//       const res = await axios.put(`${API_BASE_URL}/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Update failed");
//     }
//   }
// );

export const updateAdminProfile = createAsyncThunk(
  "adminProfile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.put(
        `${API_BASE_URL}/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);


/* ===============================
   CHANGE PASSWORD
================================ */
export const changeAdminPassword = createAsyncThunk(
  "adminProfile/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(
        `${API_BASE_URL}/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Password change failed");
    }
  }
);

const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateAdminProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAdminProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changeAdminPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAdminPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminProfileSlice.reducer;
