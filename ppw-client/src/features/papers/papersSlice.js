import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCourses } from './papersAPI';

const initialState = {
  status: 'idle',
  courses: [],
};

export const fetchCoursesAsync = createAsyncThunk(
  'papers/fetchCourses',
  async (universityId) => {
    const res = await fetchCourses(universityId);
    return res.data;
  }
);

export const papersSlice = createSlice({
  name: 'papers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoursesAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCoursesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.courses = action.payload.courses;
    });
  },
});

export default papersSlice.reducer;
