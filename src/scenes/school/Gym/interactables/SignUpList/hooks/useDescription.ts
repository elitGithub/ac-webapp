import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Tanner, obviously. Brad, yup. Chad? Where is Chad? Oh, there he is. Yeah, if I ever made a hit list, this is what it would look like.';
};
