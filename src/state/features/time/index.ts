import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface TimeState {
  hour: number;
  day: number;
  energy: number;
  allowAdvance: boolean;
}

export const initialState: TimeState = {
  hour: 7,
  day: 1,
  energy: 100,
  allowAdvance: true
};

const { actions, reducer } = createSlice({
  name: 'time',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Partial<TimeState>>) => ({
      ...state,
      ...payload
    }),
    advance: (state, { payload }: PayloadAction<number>) => ({
      ...state,
      hour: (state.hour + payload) % 24, // Wrap at 24 hours
      day: state.hour >= 23 ? state.day + 1 : state.day, // Increment day after 23 hours
      energy: 100 // Reset energy
    }),
    useEnergy: (state, { payload }: PayloadAction<number>) => {
      const newEnergy = state.energy - payload;
      const newHour = newEnergy <= 0 ? state.hour + 1 : state.hour;
      const newDay = newHour >= 23 ? state.day + 1 : state.day;

      return {
        ...state,
        hour: newHour,
        day: newDay,
        energy: newEnergy > 0 ? newEnergy : 100 // Reset energy if depleted
      };
    }
  }
});

// Selectors
export const dayName = (day: number) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[(day % 7 + 7) % 7];
};


export const { set, advance, useEnergy } = actions;

export default reducer;
