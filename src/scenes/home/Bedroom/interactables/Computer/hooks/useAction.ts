// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { internet } from 'quests/pottedWeeds/internet';

export const useAction = () => {
  const potted_weeds_phase = useAppSelector(
    (state) => state.quest.potted_weeds.phase
  );

  if (potted_weeds_phase === 'internet') {
    return internet();
  }

  return (function* () {})();
};
