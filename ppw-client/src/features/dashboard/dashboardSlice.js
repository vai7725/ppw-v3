import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  acceptContribution,
  fetchContacts,
  fetchContributedPapersData,
  fetchUsersData,
  resolveContactQuery,
} from './dashboardAPI';
import toast from 'react-hot-toast';

const initialState = {
  status: 'idle',
  loadStatus: {
    users: 'idle',
    contacts: 'idle',
    contributions: 'idle',
  },
  users: [],
  contacts: [],
  contributions: [],
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

export const fetchContributedPapersDataAsync = createAsyncThunk(
  'dashboard/fetchContributedPapersData',
  async () => {
    try {
      const res = await fetchContributedPapersData();
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const acceptContributionAsync = createAsyncThunk(
  'dashboard/acceptContribution',
  async ({ contributionId, userId }) => {
    try {
      const res = await acceptContribution(contributionId, userId);
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
    handleContactSpecificLoader: (state, action) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact._id === action.payload) {
          return {
            ...contact,
            status: 'loading',
          };
        }
        return {
          ...contact,
          status: 'idle',
        };
      });
    },
    handleContributionSpecificLoader: (state, action) => {
      state.contributions = state.contributions.map((cont) => {
        if (cont._id === action.payload) {
          return {
            ...cont,
            status: 'loading',
          };
        }
        return {
          ...cont,
          status: 'idle',
        };
      });
    },
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
      state.contacts = action.payload.contacts.map((contact) => ({
        ...contact,
        status: 'idle',
      }));
    });
    builder.addCase(resolveContactQueryAsync.pending, (state, action) => {
      state.loadStatus.contacts = 'loading';
    });
    builder.addCase(resolveContactQueryAsync.fulfilled, (state, action) => {
      state.loadStatus.contacts = 'idle';
      state.contacts = state.contacts.filter(
        (contact) => contact._id !== action.payload.contactId
      );
      toast.success(action.payload.msg);
    });
    builder.addCase(resolveContactQueryAsync.rejected, (state, action) => {
      state.loadStatus.contacts = 'idle';
      toast.error(action.payload.msg);
    });
    builder.addCase(
      fetchContributedPapersDataAsync.pending,
      (state, action) => {
        state.status = 'loading';
      }
    );
    builder.addCase(
      fetchContributedPapersDataAsync.fulfilled,
      (state, action) => {
        state.status = 'idle';
        state.contributions = action.payload.paper.map((paper) => ({
          ...paper,
          status: 'idle',
        }));
      }
    );
    builder.addCase(
      fetchContributedPapersDataAsync.rejected,
      (state, action) => {
        state.status = 'idle';
        toast.error(action.payload.msg);
      }
    );
    builder.addCase(acceptContributionAsync.pending, (state, action) => {
      state.loadStatus.contributions = 'loading';
    });
    builder.addCase(acceptContributionAsync.fulfilled, (state, action) => {
      state.loadStatus.contributions = 'idle';
      toast.success(action.payload.msg);
      state.contributions = state.contributions.filter(
        (cont) => cont._id !== action.payload.contributionId
      );
    });
    builder.addCase(acceptContributionAsync.rejected, (state, action) => {
      state.loadStatus.contributions = 'idle';
      toast.error(action.payload.msg);
    });
  },
});

export const {
  clearState,
  handleContactSpecificLoader,
  handleContributionSpecificLoader,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
