import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  "https://ro-service-engineer-be-ipm3.onrender.com/api/admin/popularCities";



/* =========================
   GET Popular Cities
========================= */
export const fetchPopularCities = createAsyncThunk(
  "popularCities/fetch",
  async ({ page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${BASE_URL}/getAllCities?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Backend → Frontend mapping
      const mapped = (res.data?.cities || []).map((item) => ({
        id: item._id,
        city: item.city || "",
        cityName: item.city || "", // backward compatibility
        state: item.state || "",
        stateName: item.state || "", // optional legacy naming
        mobile: item.mobile || "",
        contactNumber: item.mobile || "", // backward compatibility
        email: item.email || "",
        contactEmail: item.email || "", // backward compatibility
        whatsappLink: item.whatsappLink || item.whatsAppLink || "",
        overview: item.overview || "",
        features: item.features || "",
        installation: item.installation || "",
        servedCustomers: item.servedCustomers || [],
        reviews: item.reviews || [],
        faqs: item.faqs || [],
        storeLocations: item.storeLocations || [],
      }));

      return {
        cities: mapped,
        totalCities: res.data?.totalCities ?? mapped.length,
        totalPages: res.data?.totalPages ?? 1,
        currentPage: res.data?.currentPage ?? page,
      };
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

      const res = await axios.post(`${BASE_URL}/addCity`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

      await axios.delete(`${BASE_URL}/deleteCityById/${id}`, {
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
    {
      id,
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

      // Remove empty optional fields
      Object.keys(payload).forEach((key) => {
        const val = payload[key];
        const isEmptyString = typeof val === "string" && val.trim() === "";
        if (val === undefined || val === null || isEmptyString) {
          delete payload[key];
        }
      });

      const res = await axios.put(`${BASE_URL}/updateCityById/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const item = res.data?.data || res.data;

      // Map backend → frontend
      return {
        id: item._id,
        city: item.city || "",
        cityName: item.city || "", // backward compatibility
        state: item.state || "",
        stateName: item.state || "",
        mobile: item.mobile || "",
        contactNumber: item.mobile || "",
        email: item.email || "",
        contactEmail: item.email || "",
        whatsappLink: item.whatsAppLink || item.whatsappLink || "",
        overview: item.overview || "",
        features: item.features || "",
        installation: item.installation || "",
        servedCustomers: item.servedCustomers || [],
        reviews: item.reviews || [],
        faqs: item.faqs || [],
        storeLocations: item.storeLocations || [],
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
    totalCities: 0,
    totalPages: 1,
    currentPage: 1,
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
        state.rows = action.payload.cities;
        state.totalCities = action.payload.totalCities;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
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
        state.totalCities = (state.totalCities || 0) + 1;
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
        state.totalCities = Math.max(0, (state.totalCities || 0) - 1);
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
