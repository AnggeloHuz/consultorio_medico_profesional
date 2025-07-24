import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: true,
    error: "",
    message: "",
    username: ""
  },
  extraReducers: (builder) => {
    
  },
})

export default authSlice.reducer