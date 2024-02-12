// Libraries
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({scene: 'school_art_class', sceneTitle: 'Art Class'});
};
