import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return '1982 Regional Championship. The pride of the school. Ridiculous how this is still relevant. Not even the coach is the same.';
};
