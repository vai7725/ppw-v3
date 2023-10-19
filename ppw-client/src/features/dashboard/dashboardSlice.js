import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  fetchUsersData,
  resolveContactQuery,
} from './dashboardAPI';
import toast from 'react-hot-toast';

const initialState = {
  status: 'idle',
  users: [],
  contacts: [],
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

export const fetchContactsAsync = createAsyncThunk(
  'dashboard/fetchContacts',
  async () => {
    try {
      const res = await fetchContacts();
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const resolveContactQueryAsync = createAsyncThunk(
  'dashboard/resolveContactQuery',
  async (contactId) => {
    try {
      const res = await resolveContactQuery(contactId);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.contacts = [];
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersDataAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUsersDataAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.users = action.payload.users;
    });
    builder.addCase(fetchContactsAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchContactsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.contacts = action.payload.contacts;
    });
    builder.addCase(resolveContactQueryAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(resolveContactQueryAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload.contactId
      );
      toast.success(action.payload.msg);
    });
    builder.addCase(resolveContactQueryAsync.rejected, (state, action) => {
      state.status = 'idle';
      toast.error(action.payload.msg);
    });
  },
});

export const { clearState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
