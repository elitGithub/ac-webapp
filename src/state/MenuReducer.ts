import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppScreens {
  MainMenu,
  NewGame,
  ChapterSelect,
  TipsAndTricks,
  LoadGame,
  Settings,
  Credits,
  Quit,
}

interface MenuState {
  currentScreen: number | undefined;
}

const initialState: MenuState = {
  currentScreen: undefined
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<number>) => {
      state.currentScreen = action.payload;
    }
  }
});

export const { setCurrentScreen } = menuSlice.actions;
export default menuSlice.reducer;
