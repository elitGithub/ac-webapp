import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return "The locker rooms. The lions' den. The heart of darkness. Once you enter, you'll never be the same again.";
};
