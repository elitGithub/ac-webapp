import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  // TODO: Return a string for the description
  return "Flora once got one of those crime scene blacklights for her birthday.\n\nShe almost threw up when she pointed it at my bed.\n\nPoor Flora, she wasn't ready.";
};
