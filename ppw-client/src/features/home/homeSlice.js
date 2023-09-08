import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUniversities, modifyUniversity, saveUniversity } from './homeAPI';

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
  },
});

export default homeSlice.reducer;
