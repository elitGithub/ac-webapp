// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { mrslPoolStart, mrslPoolNewPlan } from 'quests/poolsideStory';

export const useAction = () => {
  const { mrsl_pool } = useAppSelector((state) => ({
    mrsl_pool: state.quest.poolside_story,
  }));

  if (!mrsl_pool.started) {
    return mrslPoolStart();
  }
  if (mrsl_pool.phase === 'new_plan') {
    return mrslPoolNewPlan();
  }

  // This is just for type safety, we should never reach this point
  return (function* () {})();
};
