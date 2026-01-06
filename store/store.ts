import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

// Temporarily use only auth slice to fix the Provider error
export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Will add other slices once this works
    events: (state = { events: [], isLoading: false, error: null }) => state,
    favorites: (state = { favoriteEvents: [], isLoading: false }) => state,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;