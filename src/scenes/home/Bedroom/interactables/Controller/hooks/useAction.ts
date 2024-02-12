// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact, take } from '../sequences';

export const useAction = () => {
  const controller = useAppSelector(
    (state) => state.scene.home_bedroom.controller
  );

  // If the controller has already been interacted with, next step is to take it
  if (controller === 'interacted') return take(15);

  // Default to interacting with the controller
  return interact(7);
};
