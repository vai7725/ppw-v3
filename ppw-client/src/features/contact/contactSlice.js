import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postContactQuery } from './contactAPI';

const initialState = {
  status: 'idle',
  submissionMsg: '',
};

export const postContactQueryAsync = createAsyncThunk(
  'contact/postContactQuery',
  async (data) => {
    const res = await postContactQuery(data);
    return res.data;
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postContactQueryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postContactQueryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.submissionMsg = action.payload.msg;
      });
  },
});

export default contactSlice.reducer;
