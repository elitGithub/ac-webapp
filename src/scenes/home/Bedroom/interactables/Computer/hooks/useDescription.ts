import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  // TODO: Return a string for the description
  return "It's not an addiction. Stopping would be easy... but why, though? At least, it's not drugs or alcohol.";
};
