import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return 'Cute girls getting irrevocably tied up in the volleyball net — my favorite hentai plot point.';
};
