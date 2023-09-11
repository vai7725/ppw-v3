import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  editCourse,
  fetchCourse,
  fetchUniversities,
  modifyUniversity,
  saveUniversity,
} from './homeAPI';

const initialState = {
  status: 'idle',
  universities: [],
  course: {},
};

export const fetchUniversitiesAsync = createAsyncThunk(
  'home/fetchUniversity',
  async () => {
    const res = await fetchUniversities();
    return res.data;
  }
);

export const saveUniversityAsync = createAsyncThunk(
  'home/saveUniversity',
  async (data) => {
    const res = await saveUniversity(data);
    return res.data;
  }
);

export const modifyUniversityAsync = createAsyncThunk(
  'home/modifyUniversity',
  async ({ universityId, data }) => {
    try {
      const res = await modifyUniversity(universityId, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchCourseAsync = createAsyncThunk(
  'home/fetchCourse',
  async (courseId) => {
    try {
      const res = await fetchCourse(courseId);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const editCourseAsync = createAsyncThunk(
  'home/editCourse',
  async ({ courseId, editData }) => {
    try {
      const res = await editCourse(courseId, editData);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleUniversityOptions: (state, action) => {
      state.universities = state.universities.map((university) => {
        if (university._id === action.payload) {
          return {
            ...university,
            showOptions: !university.showOptions,
          };
        }
        return university;
      });
    },
    clearCourse: (state, action) => {
      state.course = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUniversitiesAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUniversitiesAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.universities = action.payload.universities.map((university) => ({
        ...university,
        showOptions: false,
      }));
    });
    builder.addCase(saveUniversityAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(saveUniversityAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(saveUniversityAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(modifyUniversityAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(modifyUniversityAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(modifyUniversityAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(fetchCourseAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchCourseAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.course = action.payload.course;
    });
    builder.addCase(fetchCourseAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(editCourseAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(editCourseAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(editCourseAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
  },
});

export const { toggleUniversityOptions, clearCourse } = homeSlice.actions;

export default homeSlice.reducer;
