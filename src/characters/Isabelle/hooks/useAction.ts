// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { mrslPoolPetition } from 'quests/poolsideStory';

export const useAction = () => {
  const { mrsl_pool } = useAppSelector((state) => ({
    mrsl_pool: state.quest.poolside_story,
  }));

  if (mrsl_pool.phase === 'petition') {
    return mrslPoolPetition();
  }

  // This is just for type safety, we should never reach this point
  return (function* () {})();
};
