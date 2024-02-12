// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact } from '../sequences';

export const useAction = () => {
  const doorFlora = useAppSelector(
    (state) => state.scene.door_flora
  );

  // Default to interacting with the controller
  return interact(7);
};
