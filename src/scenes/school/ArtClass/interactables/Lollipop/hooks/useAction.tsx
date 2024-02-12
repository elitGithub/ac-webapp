// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences

export const useAction = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  // This is just for type safety, we should never reach this point
  return (function* () {})();
};
