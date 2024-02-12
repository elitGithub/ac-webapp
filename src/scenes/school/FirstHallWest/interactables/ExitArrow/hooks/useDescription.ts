import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  // TODO: Return a string for the description
  return "It's called the 1st Floor Hall, but it's technically the hall on the second floor. A British linguistic relic, I'm sure. Very posh.";
};
