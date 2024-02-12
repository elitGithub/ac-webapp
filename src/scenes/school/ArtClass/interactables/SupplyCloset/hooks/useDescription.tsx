import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));
  // TODO: Return a string for the description
  //elif quest.kate_search_for_nurse.started:
  //  return "Supposedly, you'll find everything you need here. Where the hell is my muse?"
  //elif quest.flora_jacklyn_introduction.started:
  //  return "Being an artist is less about equipment and more about imagination and execution — you can't have art without either."

  return "Whenever my artist career takes off, these things will come in handy. For now, I'll stick to drawing stick figures.";
};
