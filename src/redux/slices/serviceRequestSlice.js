import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig'


export const getAllServiceRequests = createAsyncThunk(
  'serviceRequest/getAllServiceRequests',
  async ({ limit = 10, page = 1, search = '', status = '' }, { rejectWithValue }) => {
    try {
      // Build query params
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit);
      if (page) params.append('page', page);
      if (search) params.append('search', search);
      if (status && status !== 'All') params.append('status', status);

      const response = await axiosInstance.get(
        `/api/admin/serviceRequest/getAllServiceRequests?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || 'Something went wrong' });
    }
  }
);

// Async thunk to fetch service request details by ID
export const getServiceRequestById = createAsyncThunk(
  'serviceRequest/getServiceRequestById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/serviceRequest/getServiceRequestById/${id}`
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || 'Failed to fetch service request details' });
    }
  }
);

// Async thunk to update service request status
export const updateServiceRequestStatus = createAsyncThunk(
  'serviceRequest/updateServiceRequestStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/api/admin/serviceRequest/updateServiceRequestStatus/${id}`,
        { status }
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || 'Failed to update status' });
    }
  }
);

// Initial state
const initialState = {
  serviceRequests: [],
  totalRequests: 0,
  totalPages: 0,
  currentPage: 1,
  currentRequest: null, // Store single request details
  loading: false,
  detailLoading: false, // Separate loading for details
  updateLoading: false, // Separate loading for updates
  error: null,
  success: false,
  updateSuccess: false,
};

// Service request slice
const serviceRequestSlice = createSlice({
  name: 'serviceRequest',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Clear success
    clearSuccess: (state) => {
      state.success = false;
      state.updateSuccess = false;
    },
    // Clear current request
    clearCurrentRequest: (state) => {
      state.currentRequest = null;
    },
    // Reset state
    resetServiceRequestState: (state) => {
      state.serviceRequests = [];
      state.totalRequests = 0;
      state.totalPages = 0;
      state.currentPage = 1;
      state.currentRequest = null;
      state.loading = false;
      state.detailLoading = false;
      state.updateLoading = false;
      state.error = null;
      state.success = false;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all service requests
      .addCase(getAllServiceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllServiceRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        
        // Handle API response with pagination object
        if (action.payload.data) {
          state.serviceRequests = action.payload.data;
          
          // Extract pagination data from pagination object
          if (action.payload.pagination) {
            state.totalRequests = action.payload.pagination.totalRecords || 0;
            state.totalPages = action.payload.pagination.totalPages || 1;
            state.currentPage = action.payload.pagination.currentPage || 1;
          } else {
            // Fallback if pagination object doesn't exist
            state.totalRequests = action.payload.totalCount || action.payload.data.length;
            state.totalPages = action.payload.totalPages || 1;
            state.currentPage = action.payload.currentPage || 1;
          }
        } else {
          state.serviceRequests = [];
          state.totalRequests = 0;
          state.totalPages = 1;
          state.currentPage = 1;
        }
      })
      .addCase(getAllServiceRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch service requests';
        state.serviceRequests = [];
      })

      // Get service request by ID
      .addCase(getServiceRequestById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(getServiceRequestById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.success = true;
        
        // Store the single request details
        if (action.payload.data) {
          state.currentRequest = action.payload.data;
        }
      })
      .addCase(getServiceRequestById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload?.message || 'Failed to fetch service request details';
        state.currentRequest = null;
      })

      // Update service request status
      .addCase(updateServiceRequestStatus.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateServiceRequestStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = true;
        
        // Update current request if it exists
        if (action.payload.data && state.currentRequest) {
          state.currentRequest = action.payload.data;
        }

        // Also update in the list if the request exists there
        if (action.payload.data && state.serviceRequests.length > 0) {
          const index = state.serviceRequests.findIndex(
            req => req._id === action.payload.data._id
          );
          if (index !== -1) {
            state.serviceRequests[index] = action.payload.data;
          }
        }
      })
      .addCase(updateServiceRequestStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload?.message || 'Failed to update status';
      });
  },
});

// Export actions
export const { clearError, clearSuccess, clearCurrentRequest, resetServiceRequestState } = serviceRequestSlice.actions;

// Export reducer
export default serviceRequestSlice.reducer;