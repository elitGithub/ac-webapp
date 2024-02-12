// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact, take } from '../sequences';

export const useAction = () => {
  const interacted = useAppSelector(
    (state) => state.scene.home_hall.umbrella_interacted
  );

  if (!interacted) return interact();

  return take();
};
