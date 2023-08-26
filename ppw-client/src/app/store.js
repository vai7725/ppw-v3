import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import papersReducer from '../features/papers/papersSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    papers: papersReducer,
  },
});
