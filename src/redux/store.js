// redux/store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

// Import your reducers (replace with actual reducer imports)
import poolsReducer from './poolsSlice';

export const store = configureStore({
  reducer: {
    pools: poolsReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredPaths: ['pools.entities'],
      ignoredActionPaths: ['meta.arg', 'payload'],
    },
  }),
});
