import { useAppSelector } from 'state/hooks';

export const useTitle = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Easel';
};
