import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCourses,
  fetchExamYears,
  fetchFilteredPapers,
  fetchPapers,
  fetchSubjectTitles,
  fetchUniversity,
} from './papersAPI';

const initialState = {
  status: 'idle',
  page: 1,
  errorMsg: '',
  hasMorePages: true,
  papersFiltered: false,
  university: {},
  courses: [],
  papers: [],
  subjectTitles: [],
  examYears: [],
  selectedFilters: {
    courseId: '',
    exam_year: '',
    subject_title: '',
  },
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

export const fetchExamYearsAsync = createAsyncThunk(
  'papers/fetchExamYears',
  async ({ universityId, courseId }) => {
    const res = await fetchExamYears(universityId, courseId);
    return res.data;
  }
);

export const fetchSubjectTitlesAsync = createAsyncThunk(
  'papers/fetchSubjectTitles',
  async ({ universityId, courseId, exam_year }) => {
    const res = await fetchSubjectTitles(universityId, courseId, exam_year);
    return res.data;
  }
);

export const fetchFilteredPapersAsync = createAsyncThunk(
  'papers/fetchFilteredPapers',
  async ({ universityId, courseId, exam_year, subject_title }) => {
    const res = await fetchFilteredPapers(
      universityId,
      courseId,
      exam_year,
      subject_title
    );
    return res.data;
  }
);

export const papersSlice = createSlice({
  name: 'papers',
  initialState,
  reducers: {
    updateFilters: (state, action) => {
      const { payload } = action;
      state.selectedFilters = { ...state.selectedFilters, ...payload };
    },
    clearPapers: (state) => {
      state.papers = [];
    },
    clearFilters: (state) => {
      state.subjectTitles = [];
      state.examYears = [];
    },
  },
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
        state.page += 1;
        if (action.payload.papers.length < 30) {
          state.hasMorePages = false;
        } else {
          state.hasMorePages = true;
        }
        state.papersFiltered = action.payload.papersFiltered;
      })
      .addCase(fetchPapersAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.errorMsg = 'Some error occured. Try again later';
      })
      .addCase(fetchExamYearsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExamYearsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.examYears = action.payload.examYears;
        state.papers = action.payload.papers;
        state.hasMorePages = false;
        state.papersFiltered = action.payload.papersFiltered;
      })
      .addCase(fetchSubjectTitlesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubjectTitlesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.subjectTitles = action.payload.paperTitles;
        state.papers = action.payload.papers;
        state.hasMorePages = false;
        state.papersFiltered = action.payload.papersFiltered;
      })
      .addCase(fetchFilteredPapersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredPapersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.papers = action.payload.papers;
        state.page = 1;
        state.papersFiltered = action.payload.papersFiltered;
      });
  },
});

export const { updateFilters, clearPapers, clearFilters } = papersSlice.actions;

export default papersSlice.reducer;
