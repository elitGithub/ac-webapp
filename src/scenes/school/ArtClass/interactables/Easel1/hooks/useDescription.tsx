import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  return 'A picnic basket, but instead of food, it contains five candles, a salt shaker, a sword, and what looks like a pair of panties.';
};
