import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: string;
  image: string;
  category: string;
  type: string;
}

interface FavoritesState {
  favoriteEvents: Event[];
  isLoading: boolean;
}

const initialState: FavoritesState = {
  favoriteEvents: [],
  isLoading: false,
};

// Async thunk for loading favorites from AsyncStorage
export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async () => {
    try {
      const favorites = await AsyncStorage.getItem('favoriteEvents');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      return [];
    }
  }
);

// Async thunk for saving favorites to AsyncStorage
export const saveFavorites = createAsyncThunk(
  'favorites/saveFavorites',
  async (favorites: Event[]) => {
    try {
      await AsyncStorage.setItem('favoriteEvents', JSON.stringify(favorites));
      return favorites;
    } catch (error) {
      throw error;
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Event>) => {
      const event = action.payload;
      const existingIndex = state.favoriteEvents.findIndex(fav => fav.id === event.id);
      
      if (existingIndex === -1) {
        state.favoriteEvents.push(event);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const eventId = action.payload;
      state.favoriteEvents = state.favoriteEvents.filter(fav => fav.id !== eventId);
    },
    toggleFavorite: (state, action: PayloadAction<Event>) => {
      const event = action.payload;
      const existingIndex = state.favoriteEvents.findIndex(fav => fav.id === event.id);
      
      if (existingIndex === -1) {
        state.favoriteEvents.push(event);
      } else {
        state.favoriteEvents.splice(existingIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteEvents = action.payload;
      })
      .addCase(saveFavorites.fulfilled, (state, action) => {
        state.favoriteEvents = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;