// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({scene: 'school_first_hall', sceneTitle: 'First Hall'});
};
