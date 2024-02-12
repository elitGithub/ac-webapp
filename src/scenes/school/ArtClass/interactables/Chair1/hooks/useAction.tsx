// Libraries
import { useAppSelector } from 'state/hooks';
import { interact } from '../sequences';

// Sequences

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // Pull out the state you need here
  }));
  return interact();
};
