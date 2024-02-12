import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  return 'In a place of exotic extravagance and beauty, how come the most alluring thing is the door out?';
};
