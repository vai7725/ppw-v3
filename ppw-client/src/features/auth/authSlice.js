import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  checkUsername,
  fetchUser,
  forgotPassword,
  login,
  logoutUser,
  registerUser,
  resendVerificationEmail,
  resetPassword,
} from './authAPI';
// import Cookies from 'js-cookie';

const initialState = {
  status: 'idle',
  isAuthenticated: false,
  user: null,
  verificationSession: false,
  activeForgotPasswordSession: false,
  errorMsg: '',
  showPassword: false,
  usernameValidationMsg: '',
  username_input: '',
};

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (data) => {
    const res = await registerUser(data);
    return res.data;
  }
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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

export const checkUsernameAsync = createAsyncThunk(
  'papers/checkUsername',
  async (value) => {
    try {
      const res = await checkUsername(value);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
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
    updatePasswordVisibility: (state, action) => {
      state.showPassword = !state.showPassword;
    },
    updateUsernameValue: (state, action) => {
      state.username_input = action.payload;
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
      // document.cookie = `accessToken=${action.payload.accessToken};`;
      // Cookies.set('accessToken', action.payload.accessToken, {
      //   expires: 10,
      //   path: '/',
      //   sameSite: 'none',
      //   secure: true,
      // });
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = 'idle';
      state.errorMsg = action.payload.msg;
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
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserAsync.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(logoutUserAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.user = null;
      state.isAuthenticated = false;
      // Cookies.remove('accessToken');
    });
    builder.addCase(logoutUserAsync.rejected, (state, action) => {
      state.status = 'idle';
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
    builder.addCase(checkUsernameAsync.pending, (state, action) => {});
    builder.addCase(checkUsernameAsync.fulfilled, (state, action) => {
      state.usernameValidationMsg = action.payload.msg;
    });
    builder.addCase(checkUsernameAsync.rejected, (state, action) => {
      state.usernameValidationMsg = action.payload.msg;
    });
  },
});

export const {
  updateUserEmail,
  updateVerificationSession,
  updateAuthentication,
  updateForgotPasswordSession,
  updatePasswordVisibility,
  updateUsernameValue,
} = authSlice.actions;

export default authSlice.reducer;
