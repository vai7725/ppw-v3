import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  editPaper,
  fetchCourses,
  fetchExamYears,
  fetchFilteredPapers,
  fetchPaper,
  fetchPapers,
  fetchSubjectTitles,
  fetchUniversity,
  saveCourse,
  savePaper,
  updatePaperViews,
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
  paper: {},
  subjectTitles: [],
  examYears: [],
  subject_title_input: '',
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

export const updatePaperViewsAsync = createAsyncThunk(
  'papers/updatePaperViews',
  async ({ paperId, file_link }) => {
    const res = await updatePaperViews(paperId, file_link);
    return res.data;
  }
);

export const savePaperAsync = createAsyncThunk(
  'papers/savePaper',
  async (data) => {
    try {
      const res = await savePaper(data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const saveCourseAsync = createAsyncThunk(
  'papers/saveCourse',
  async (data) => {
    try {
      const res = await saveCourse(data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const editPaperAsync = createAsyncThunk(
  'papers/editPaper',
  async ({ paperId, data }) => {
    try {
      const res = await editPaper(paperId, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchPaperAsync = createAsyncThunk(
  'papers/fetchPaper',
  async (paperId) => {
    try {
      const res = await fetchPaper(paperId);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
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
    clearCourses: (state) => {
      state.courses = [];
    },
    clearUniversity: (state) => {
      state.university = {};
    },
    clearPaper: (state) => {
      state.paper = {};
    },
    handleSubjectTitleInput: (state, action) => {
      state.subject_title_input = action.payload;
    },
    resetPage: (state) => {
      state.page = 1;
    },
    removeDeletedPaper: (state, action) => {
      state.papers = state.papers.filter(
        (paper) => paper._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversityAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUniversityAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.university = {
          ...action.payload.university,
          papersCount: action.payload.papersCount,
        };
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
        if (action.payload.papers.length < 15) {
          state.hasMorePages = false;
          state.page = 1;
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
      })
      .addCase(savePaperAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(savePaperAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(savePaperAsync.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchPaperAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPaperAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.paper = action.payload.paper;
        state.subject_title_input = action.payload.paper.subject_title;
      })
      .addCase(fetchPaperAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.paper = {};
      })
      .addCase(editPaperAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editPaperAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(editPaperAsync.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const {
  updateFilters,
  clearPapers,
  clearFilters,
  clearCourses,
  clearUniversity,
  handleSubjectTitleInput,
  clearPaper,
  resetPage,
  removeDeletedPaper,
} = papersSlice.actions;

export default papersSlice.reducer;
