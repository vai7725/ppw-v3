import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import papersReducer from '../features/papers/papersSlice';
import contactReducer from '../features/contact/contactSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducers from '../features/dashboard/dashboardSlice';
import contributionReducers from '../features/contribute/contributionSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    papers: papersReducer,
    contact: contactReducer,
    auth: authReducer,
    dashboard: dashboardReducers,
    contribution: contributionReducers,
  },
});
