import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ro-service-engineer-be.onrender.com/api/admin";

const getAuthConfig = () => {
  const token = localStorage.getItem("adminToken"); 
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// 1. Fetch Leads
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async ({ page, limit, search, status }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await axios.get(
        `${BASE_URL}/lead?${params.toString()}`,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch leads");
    }
  }
);

// 2. Fetch Lead Details
export const fetchLeadDetails = createAsyncThunk(
  "leads/fetchLeadDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/lead/${id}`, getAuthConfig());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch lead details");
    }
  }
);

// 3. ✅ Update Lead (Fixed: Now points to /assign)
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // ⚠️ CRITICAL FIX: The generic endpoint /lead/:id was 404.
      // We MUST use /assign because that is what exists on the server.
      const response = await axios.put(
        `${BASE_URL}/lead/assign/${id}`, 
        data,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update lead");
    }
  }
);

// (Alias for clarity, point to updateLead)
export const assignLead = updateLead;

const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    selectedLead: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearLeadError: (state) => { state.error = null; },
    clearLeadSuccess: (state) => { state.successMessage = null; },
    clearSelectedLead: (state) => { state.selectedLead = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload.data || [];
      })
      .addCase(fetchLeadDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLead = action.payload.data || action.payload;
      })
      // ✅ Update Lead Handlers
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Lead assigned successfully!";
        // Optimistic Update
        if (state.selectedLead && state.selectedLead._id === action.meta.arg.id) {
             state.selectedLead = { 
                 ...state.selectedLead, 
                 status: 'progress', // Backend sets this automatically
                 ...action.meta.arg.data 
             };
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Common Matchers
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected') && !action.type.includes('updateLead'),
        (state, action) => { state.loading = false; state.error = action.payload; }
      );
  },
});

export const { clearLeadError, clearLeadSuccess, clearSelectedLead } = leadSlice.actions;
export default leadSlice.reducer;