import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleContribution } from './contributionAPI';
import toast from 'react-hot-toast';

const initialState = {
  status: 'idle',
};

export const handleContributionAsync = createAsyncThunk(
  'contribution/paper',
  async (data) => {
    try {
      const res = await handleContribution(data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const contributionSlice = createSlice({
  name: 'contribution',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleContributionAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleContributionAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        toast.success(action.payload.msg);
      })
      .addCase(handleContributionAsync.rejected, (state, action) => {
        state.status = 'idle';
        toast.error(action.payload.msg);
      });
  },
});

export default contributionSlice.reducer;
