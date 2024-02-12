import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Drawn to the trash. Drawn to the filth. Not even the longest of showers can ever truly wash away the dirt.';
};
