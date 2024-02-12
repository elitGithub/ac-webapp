// Libraries
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import character from './features/character';
import display from './features/display';
import scene from './features/scene';
import time from './features/time';
import quest from './features/quest';
import menuReducer from './MenuReducer';

export const store = configureStore({
  reducer: {
    character,
    display,
    scene,
    time,
    quest,
    menuReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
