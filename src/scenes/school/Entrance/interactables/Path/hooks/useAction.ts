// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({ scene: 'school_forest_glade', sceneTitle: 'Forest Glade' });
};
