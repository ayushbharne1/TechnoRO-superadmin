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
    {
      city,
      state,
      mobile,
      email,
      whatsappLink,
      overview,
      features,
      installation,
      servedCustomers,
      reviews,
      faqs,
      storeLocations,
    },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("adminToken");

      // Map UI shape -> API shape
      const payload = {
        city,
        state,
        mobile,
        email,
        whatsAppLink: whatsappLink,
        overview,
        features,
        installation,
        servedCustomers: (servedCustomers || []).map((c) => ({
          customerName: c.customerName || c.name || "",
          initials: c.initials || "",
          serviceDate: c.serviceDate || c.date || "",
          status: c.status || "",
          address: c.address || c.fullAddress || "",
          customerQuery: c.customerQuery || c.query || "",
        })),
        reviews: (reviews || []).map((r) => ({
          customerName: r.customerName || r.name || "",
          location: r.location || "",
          rating: r.rating || 0,
          reviewText: r.reviewText || r.review || "",
        })),
        faqs: faqs || [],
        storeLocations: (storeLocations || []).map((s) => ({
          storeName: s.storeName || s.name || "",
          fullAddress: s.fullAddress || s.address || "",
          openingHours: s.openingHours || s.timing || "",
        })),
      };

      // Remove empty optional fields so backend doesn't reject
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        const isEmptyString = typeof val === "string" && val.trim() === "";
        if (val === undefined || val === null || isEmptyString) {
          delete payload[key];
        }
      });

      const res = await axios.post(
        "https://ro-service-engineer-be-o14k.onrender.com/api/admin/popularCities/addCity",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const item = res.data?.data || res.data;

      return {
        id: item._id,
        city: String(item.city || ""),
        state: String(item.state || ""),
        mobile: String(item.mobile || ""),
        email: String(item.email || ""),
        whatsappLink: String(item.whatsappLink || item.whatsAppLink || ""),
        overview: item.overview || "",
        features: item.features || "",
        installation: item.installation || "",
        servedCustomers: item.servedCustomers || [],
        reviews: item.reviews || [],
        faqs: item.faqs || [],
        storeLocations: item.storeLocations || [],
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add city");
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
