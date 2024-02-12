import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  return 'The Flying Dutchman of my haunted past. Forever sailing through my dreams of disappointment.';
};
