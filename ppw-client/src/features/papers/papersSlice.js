import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCourses, fetchPapers, fetchUniversity } from './papersAPI';

const initialState = {
  status: 'idle',
  page: 1,
  university: {},
  courses: [],
  papers: [],
  subjectTitles: [],
};

export const fetchUniversityAsync = createAsyncThunk(
  'papers/fetchUniversity',
  async (universityId) => {
    const res = await fetchUniversity(universityId);
    return res.data;
  }
);

export const fetchCoursesAsync = createAsyncThunk(
  'papers/fetchCourses',
  async (universityId) => {
    const res = await fetchCourses(universityId);
    return res.data;
  }
);

export const fetchPapersAsync = createAsyncThunk(
  'papers/fetchPapers',
  async ({ universityId, page }) => {
    const res = await fetchPapers(universityId, page);
    return res.data;
  }
);

export const papersSlice = createSlice({
  name: 'papers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUniversityAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.university = action.payload.university;
      })
      .addCase(fetchCoursesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoursesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.courses = action.payload.courses;
      })
      .addCase(fetchPapersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPapersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.papers = [...state.papers, ...action.payload.papers];
        state.subjectTitles = action.payload.paperTitles;
        state.page += 1;
      });
  },
});

export default papersSlice.reducer;
