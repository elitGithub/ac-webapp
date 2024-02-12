import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'state';

// Re-export slice actions for convenience
export {
  equip,
  unequip,
  show,
  hide,
  moveTo,
  cset,
  addItem,
  removeItem,
  changeName,
} from './features/character';
export {
  clearText,
  setXRay,
  toggleXRay,
  goto,
  text,
  choices,
  toggleHideHUD,
  togglePhone,
  toggleInventory,
  closeOverlay,
  openPhone
} from './features/display';
export { complete, qset, start } from './features/quest';
export { set } from './features/scene';
export { advance, set as setTime, useEnergy } from './features/time';

// Special actions
export const pause: (duration: number) => PayloadAction<number> = (
  duration: number
) => ({
  type: 'special/pause',
  payload: duration,
});

export const get: (
  selector: (state: RootState) => any
) => PayloadAction<(state: RootState) => any> = (selector) => ({
  type: 'special/get',
  payload: selector,
});
