// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({ scene: 'school_ground_floor', sceneTitle: 'Ground Floor'});
};
