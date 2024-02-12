import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'An inflatable pool made for children aged 3-5. Great.';
};
