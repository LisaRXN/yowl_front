import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ratingSlice from './ratingSlice.js';
import userSlice from './userSlice.js';
import loginSlice from './loginSlice.js';
import businessSlice from './businessSlice.js';
import reviewsSlice from './reviewsSlice.js';
import serverSlice from './serverSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utiliser localStorage par défaut




const persistConfig = {
  key: 'root', 
  storage, 
};

const reducer = combineReducers({
  rating: ratingSlice,
  user: userSlice,
  login: loginSlice,
  business: businessSlice,
  reviews: reviewsSlice,
  server: serverSlice
});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
  reducer: persistedReducer, 
});

export const persistor = persistStore(store);
