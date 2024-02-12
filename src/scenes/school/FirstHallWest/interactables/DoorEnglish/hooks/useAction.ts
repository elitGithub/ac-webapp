// Libraries
import { useAppSelector } from 'state/hooks';
import { gotoScene } from 'common/sequences/gotoScene';

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return gotoScene({scene: 'school_english_class', sceneTitle: 'English Class'});
};
