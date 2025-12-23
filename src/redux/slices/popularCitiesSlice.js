import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://ro-service-engineer-be.onrender.com/api/admin/popularCities";



/* =========================
   GET Popular Cities
========================= */
export const fetchPopularCities = createAsyncThunk(
  "popularCities/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Backend → Frontend mapping
      return (res.data?.cities || []).map((item) => ({
        id: item._id,
        cityName: item.city,
        contactNumber: item.mobile,
        contactEmail: item.email,
        whatsappLink: item.whatsAppLink,
      }));
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch popular cities"
      );
    }
  }
);

/* =========================
   ADD NEW CITY
========================= */
export const addPopularCity = createAsyncThunk(
  "popularCities/add",
  async (
    { cityName, contactNumber, contactEmail, whatsappLink },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("adminToken");

      const payload = {
        city: cityName,
        mobile: contactNumber,
        email: contactEmail,
        whatsAppLink: whatsappLink,
      };

      const res = await axios.post(BASE_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const item = res.data?.data || res.data;

      return {
        id: item._id,
        cityName: String(item.city || ""),
        contactNumber: String(item.mobile || ""),
        contactEmail: String(item.email || ""),
        whatsappLink: String(item.whatsAppLink || ""),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to add city"
      );
    }
  }
);


/* =========================
   DELETE CITY
========================= */
export const deletePopularCity = createAsyncThunk(
  "popularCities/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // return deleted id for reducer
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete city"
      );
    }
  }
);

/* =========================
   UPDATE CITY
========================= */
export const updatePopularCity = createAsyncThunk(
  "popularCities/update",
  async (
    { id, cityName, contactNumber, contactEmail, whatsappLink },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("adminToken");

      const payload = {
        city: cityName,
        mobile: contactNumber,
        email: contactEmail,
        whatsAppLink: whatsappLink,
      };

      const res = await axios.put(`${BASE_URL}/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const item = res.data?.data || res.data;

      // Map backend → frontend
      return {
        id: item._id,
        cityName: item.city,
        contactNumber: item.mobile,
        contactEmail: item.email,
        whatsappLink: item.whatsAppLink,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update city"
      );
    }
  }
);


/* =========================
   SLICE
========================= */
const popularCitiesSlice = createSlice({
  name: "popularCities",
  initialState: {
    rows: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPopularCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularCities.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchPopularCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addPopularCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPopularCity.fulfilled, (state, action) => {
        state.loading = false;
        // push new city safely
        state.rows.unshift(action.payload);
      })
      .addCase(addPopularCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePopularCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePopularCity.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = state.rows.filter(
          (city) => city.id !== action.payload
        );
      })
      .addCase(deletePopularCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updatePopularCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePopularCity.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.rows.findIndex(
          (city) => city.id === action.payload.id
        );

        if (index !== -1) {
          state.rows[index] = action.payload;
        }
      })
      .addCase(updatePopularCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },
});

export default popularCitiesSlice.reducer;

