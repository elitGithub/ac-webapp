import { useAppSelector } from 'state/hooks';

export const useTitle = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  // TODO: Return a string to display as the title
  return 'Credits';
};
