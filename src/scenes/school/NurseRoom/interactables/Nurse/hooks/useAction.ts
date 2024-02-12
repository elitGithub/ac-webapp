// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { joPotGetNurse } from 'quests/pottedWeeds/joPotGetNurse';
import { talk } from '../sequences';

export const useAction = () => {
  const pottedWeeds = useAppSelector((state) => state.quest.potted_weeds);

  if (pottedWeeds.phase === 'getnurse') return joPotGetNurse();

  return talk();
};
