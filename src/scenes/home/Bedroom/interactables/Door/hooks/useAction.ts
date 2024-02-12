// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  // TODO: Add conditional for going straight to the bathroom during
  // the intro sequence
  return gotoScene({scene: 'home_hall', sceneTitle: 'Hall'});
};
