// Libraries
import { useAppSelector } from 'state/hooks';
import { interact } from '../sequences';

// Sequences

export const useAction = () => {
  return interact();
};
