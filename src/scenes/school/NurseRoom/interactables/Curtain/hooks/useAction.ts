// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { interact } from '../sequences';
import { lindseyRescueFetch } from 'quests/loserToTheRescue';
import { lindseyRescuePeek } from 'quests/loserToTheRescue';

export const useAction = () => {
  const { lindsey_rescue } = useAppSelector((state) => ({
    lindsey_rescue: state.quest.loser_to_the_rescue,
  }));

  if (lindsey_rescue.phase === 'fetch') {
    return lindseyRescueFetch();
  }

  if (lindsey_rescue.phase === 'peek') {
    return lindseyRescuePeek();
  }

  return interact();
};
