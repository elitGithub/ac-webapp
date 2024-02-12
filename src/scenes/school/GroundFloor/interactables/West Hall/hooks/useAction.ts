// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({scene: 'school_ground_floor_west', sceneTitle: 'West Groud Floor'});
};
