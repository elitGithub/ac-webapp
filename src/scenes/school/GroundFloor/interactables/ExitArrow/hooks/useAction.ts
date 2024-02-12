// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

import { useAppSelector } from 'state/hooks';
import { dayOneTakeTwoGroundFloorExitArrow } from 'quests/dayOneTakeTwo';

export const useAction = () => {
  const { dayOneTakeTwo } = useAppSelector((state) => ({
    dayOneTakeTwo: state.quest.dayonetaketwo,
  }));

  if (dayOneTakeTwo.phase === 'start') {
    return dayOneTakeTwoGroundFloorExitArrow();
  }

  return gotoScene({scene: 'school_entrance', sceneTitle: 'Entrance' });
};
