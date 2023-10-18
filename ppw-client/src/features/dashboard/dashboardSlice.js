import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsersData } from './dashboardAPI';

const initialState = {
  status: 'idle',
  users: [],
};

export const fetchUsersDataAsync = createAsyncThunk(
  'dashboard/fetchUsersData',
  async () => {
    try {
      const res = await fetchUsersData();
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersDataAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsersDataAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload.users;
    });
  },
});

export default dashboardSlice.reducer;
