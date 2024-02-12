// Libraries
import { useAppSelector } from 'state/hooks';
import { gotoScene } from 'common/sequences/gotoScene';
// Sequences

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  // TODO: conditionals blocking exit
  return gotoScene({scene: 'school_first_hall_west', sceneTitle: 'West First Floor'});
};
