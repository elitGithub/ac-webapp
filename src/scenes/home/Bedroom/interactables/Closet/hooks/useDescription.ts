import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  // TODO: Return a string for the description
  return "Shirts, pants, socks, and boxers. Dress to kill? Eh, it's probably easier for the funeral home if I arrive naked.";
};
