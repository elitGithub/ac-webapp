import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Girls have an unfair advantage rocking these. Girls have an unfair advantage, period. Except during their period.';
};
