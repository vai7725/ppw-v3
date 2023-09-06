import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchUser,
  forgotPassword,
  login,
  logoutUser,
  registerUser,
  resendVerificationEmail,
  resetPassword,
} from './authAPI';

const initialState = {
  status: 'idle',
  isAuthenticated: false,
  user: null,
  redirectToCreds: false,
  verificationSession: false,
  activeForgotPasswordSession: false,
};

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (data) => {
    const res = await registerUser(data);
    console.log(res);
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
export const forgotPasswordAsync = createAsyncThunk(
  'auth/forgotPassword',
  async (data) => {
    const res = await forgotPassword(data);
    return res.data;
  }
);
export const resetPasswordAsync = createAsyncThunk(
  'auth/resetPassword',
  async (data) => {
    const res = await resetPassword(data);
    return res.data;
  }
);
export const resendVerificationEmailAsync = createAsyncThunk(
  'auth/resendVerificationEmail',
  async () => {
    const res = await resendVerificationEmail();
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
    updateAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    updateForgotPasswordSession: (state, action) => {
      state.activeForgotPasswordSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      document.cookie = `accessToken=${action.payload.accessToken}; refreshToken-${action.payload.refreshToken}`;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(fetchUserAsync.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.isAuthenticated = true;
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
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(forgotPasswordAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(forgotPasswordAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(resetPasswordAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    builder.addCase(resendVerificationEmailAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(resendVerificationEmailAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
  },
});

export const {
  updateUserEmail,
  updateVerificationSession,
  updateAuthentication,
  updateForgotPasswordSession,
} = authSlice.actions;

export default authSlice.reducer;
