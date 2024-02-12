// Libraries
import { useAppSelector } from 'state/hooks';
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  return gotoScene({scene: 'school_music_class', sceneTitle: 'Music Class'});
};
