import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'The smell of chlorine always fills me with nostalgia, but the splashing water makes me want to drown.';
};
