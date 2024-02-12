import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Lungs burning. Sweat seeping into my eyes. The mocking laughter of my classmates. Every door in this corridor seems to lead to a place of horrible memories.';
};
