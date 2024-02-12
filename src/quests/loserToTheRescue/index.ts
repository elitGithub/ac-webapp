// Libraries
import { useContext, useEffect } from 'react';
import { TimeContext } from 'components/TimeContext';
import { useAppDispatch } from 'state/hooks';

// Actions
import { qset } from 'state/actions';

// Types
import type { SingleQuest } from 'state/features/quest';

export const useLoserToTheRescue = (quest: SingleQuest) => {
  const dispatch = useAppDispatch();
  const { onDay } = useContext(TimeContext);

  useEffect(() => {
    // switch (quest.phase) {
    //   case 'package':
    //     return onDay(() => {
    //       dispatch(
    //         qset((state) => ({
    //           quest: 'potted_weeds',
    //           package_days: (state.potted_weeds?.package_days ?? 0) + 1,
    //         }))
    //       );
    //     });
    // }
  }, [quest.phase]);
};

// Re-export the sequences
export * from './lindseyRescueStart';
export * from './lindseyRescueFetch';
export * from './lindseyRescuePeek';
export * from './lindseyRescueEnding';
