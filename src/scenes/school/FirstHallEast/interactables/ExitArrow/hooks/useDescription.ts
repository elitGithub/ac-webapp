import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'The sign above this doorway should say, "Run while you still can." It is the way out of the infamous Sports Wing, after all.';
};
