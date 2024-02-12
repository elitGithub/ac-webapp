import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  return "They say that Leonardo da Vinci worked his entire life on the Mona Lisa. Some art is perhaps never finished.\n\nThis piece definitely isn't.";
  //if kate_search_for_nurse.started:
  //return "It's an all right painting. Didn't like it very much myself, but there might be a few fans for it out there. Rating: 10/10."
};
