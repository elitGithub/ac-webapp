// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({ scene: 'home_kitchen', sceneTitle: 'Kitchen' });
};
