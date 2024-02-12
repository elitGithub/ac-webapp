// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { take } from '../sequences';

export const useAction = () => {
  return take();
};
