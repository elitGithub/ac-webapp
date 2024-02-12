import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return "If it weren't for the goddamn sun in my eyes, that shot would totally have hit! Seriously, fuck the sun!";
};
