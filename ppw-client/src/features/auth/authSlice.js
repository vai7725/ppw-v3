import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  login,
  logoutUser,
  registerRestCredentials,
  registerUserEmail,
  verifyOTP,
} from './authAPI';

const initialState = {
  status: 'idle',
  user: null,
  redirectToCreds: false,
  verificationSession: false,
};

export const registerUserEmailAsync = createAsyncThunk(
  'auth/registerUserEmail',
  async (data) => {
    const res = await registerUserEmail(data);
    return res.data;
  }
);

export const verifyOTPAsync = createAsyncThunk(
  'auth/verifyOTP',
  async (data) => {
    const res = await verifyOTP(data);
    return res.data;
  }
);

export const registerRestCredentialsAsync = createAsyncThunk(
  'auth/registerRestCredentials',
  async (data) => {
    const res = await registerRestCredentials(data);
    return res.data;
  }
);

export const loginAsync = createAsyncThunk('auth/login', async (data) => {
  const res = await login(data);
  return res.data;
});

export const fetchUserAsync = createAsyncThunk(
  'auth/fetchUser',
  async (data) => {
    const res = await fetchUser(data);
    return res.data;
  }
);
export const logoutUserAsync = createAsyncThunk(
  'auth/logoutUser',
  async (data) => {
    const res = await logoutUser(data);
    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserEmail: (state, action) => {
      state.user = action.payload;
    },
    updateVerificationSession: (state, action) => {
      state.verificationSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserEmailAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUserEmailAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.redirectToCreds = action.payload.redirectToCreds || false;
    });
    builder.addCase(verifyOTPAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(verifyOTPAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(registerRestCredentialsAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerRestCredentialsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.redirectToCreds = false;
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      document.cookie = `token=${action.payload.token}`;
    });
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = action.payload.user;
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(logoutUserAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(logoutUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = null;
    });
    builder.addCase(logoutUserAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
  },
});

export const { updateUserEmail, updateVerificationSession } = authSlice.actions;

export default authSlice.reducer;
