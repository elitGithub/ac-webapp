// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({scene: 'school_nurse_room', sceneTitle: 'Nurse Room'});
};
