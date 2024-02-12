// Libraries
import { useAppSelector } from 'state/hooks';
import { gotoScene } from 'common/sequences/gotoScene';

// Sequences

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return gotoScene({scene: 'school_first_hall_west', sceneTitle: 'First Hall West'});
};
