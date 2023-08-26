import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUniversities } from './homeAPI';

const initialState = {
  status: 'idle',
  universities: [],
};

export const fetchUniversitiesAsync = createAsyncThunk(
  'home/fetchUniversity',
  async () => {
    const res = await fetchUniversities();
    return res.data;
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUniversitiesAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUniversitiesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.universities = action.payload.universities;
    });
  },
});

export default homeSlice.reducer;
