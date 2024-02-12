// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { take } from '../sequences';

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  return take();
};
