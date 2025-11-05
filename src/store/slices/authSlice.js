import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock login function
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Temporary mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'admin@hrms.com' && credentials.password === 'password') {
        return {
          user: { 
            id: 1, 
            name: 'Admin User', 
            email: 'admin@hrms.com',
            role: 'admin'
          },
          token: 'mock-jwt-token-12345'
        };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('hrms_token'),
    isAuthenticated: !!localStorage.getItem('hrms_token'),
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('hrms_token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('hrms_token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;