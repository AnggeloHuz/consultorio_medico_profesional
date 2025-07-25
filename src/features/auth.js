import { createSlice } from '@reduxjs/toolkit'
import { login } from '../service/authService';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    loading: true,
    error: "",
    message: "",
    user: {},
    token: null
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
})

export default authSlice.reducer