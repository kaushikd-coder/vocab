import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from './features/words/wordsSlice';

const store = configureStore({
  reducer: {
    word: wordsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
