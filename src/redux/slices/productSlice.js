import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosConfig';

// 1. Fetch Product List with Filters & Pagination
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, search, category }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await axiosInstance.get(`/api/admin/product?${params.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// 2. Fetch Single Product Details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/admin/product/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch details');
    }
  }
);

// 3. Approve or Reject Product
export const updateProductStatus = createAsyncThunk(
  'products/updateStatus',
  async ({ id, action }, { rejectWithValue }) => {
    try {
      // action must be "accept" or "reject"
      const response = await axiosInstance.patch(`/api/admin/product/${id}`, { action });
      console.log("UPDATE STATUS RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.response?.data?.error || 'Update failed');
    }
  }
);

// ✅ NEW: Create Product Thunk
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      // NOTE: productData is already a FormData object here
      const response = await axiosInstance.post("/api/admin/product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      // Handle array of validation errors if present
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
         const errorMessages = error.response.data.errors.map(err => err.message).join(", ");
         return rejectWithValue(errorMessages);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

// ✅ NEW: Update Product Thunk
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/admin/product/${id}`, productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

// ✅ 4. NEW: Delete Product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/admin/product/${id}`);
      return id; // Return the ID so we can remove it from the list
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    selectedProduct: null,
    pagination: { total: 0, page: 1, pages: 1, limit: 10 },
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearProductError: (state) => { state.error = null; },
    clearSuccessMessage: (state) => { state.successMessage = null; },
    clearSelectedProduct: (state) => { state.selectedProduct = null; }
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Fetch Details
      .addCase(fetchProductDetails.pending, (state) => { state.loading = true; })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update Status
      .addCase(updateProductStatus.pending, (state) => { state.loading = true; })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message || "Status updated successfully";
        // Update the selected product if we are viewing it
        if (action.payload.data) state.selectedProduct = action.payload.data;
      })
      .addCase(updateProductStatus.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      });

      // ✅ Handle Delete
    builder
      .addCase(deleteProduct.pending, (state) => { state.loading = true; })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product deleted successfully";
        // Remove the deleted item from the local list immediately
        state.products = state.products.filter(p => p._id !== action.payload && p.id !== action.payload);
        state.pagination.total -= 1; // Update count
      })
      .addCase(deleteProduct.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      });

      // Add product

      // ✅ Handle Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product created successfully!";
        // Optional: You could append the new product to the list if you wanted
        // state.products.push(action.payload.data); 
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // ✅ Handle Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product updated successfully!";
        // Update the item in the list if it exists
        const index = state.products.findIndex(p => p._id === action.payload.data._id);
        if (index !== -1) {
          state.products[index] = action.payload.data;
        }
        state.selectedProduct = action.payload.data;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { clearProductError, clearSuccessMessage, clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;