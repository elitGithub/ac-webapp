import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'What did the lightbulb say to the switch?\n\nBaby, you turn me on!';
};
