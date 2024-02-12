import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Enough shoes to smell up the entire corridor.\n\nAlso, enough shoes to stand on and peer into the vent.';
};
