import { useContext, useEffect } from 'react';
import { TimeContext } from 'components/TimeContext';
import { SingleQuest } from 'state/features/quest';
import { useAppDispatch } from 'state/hooks';
import { qset } from 'state/actions';

export const usePottedWeeds = (quest: SingleQuest) => {
  const dispatch = useAppDispatch();
  const { onDay } = useContext(TimeContext);

  useEffect(() => {
    switch (quest.phase) {
      case 'package':
        return onDay(() => {
          dispatch(
            qset((state) => ({
              quest: 'potted_weeds',
              package_days: (state.potted_weeds?.package_days ?? 0) + 1,
            }))
          );
        });
    }
  }, [quest.phase]);
};

export * from './joPotStart';
