// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

import { useAppSelector } from 'state/hooks';
import { dayOneTakeTwoSchoolDoor } from 'quests/dayOneTakeTwo';

export const useAction = () => {
  const { dayOneTakeTwo } = useAppSelector((state) => ({
    dayOneTakeTwo: state.quest.dayonetaketwo,
  }));

  if (dayOneTakeTwo.phase === 'start') {
    return dayOneTakeTwoSchoolDoor();
  }
  return gotoScene({ scene: 'school_ground_floor', sceneTitle: 'Entrance Hall' });
};
