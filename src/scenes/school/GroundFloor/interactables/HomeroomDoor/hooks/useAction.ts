// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

import { useAppSelector } from 'state/hooks';
import { dayOneTakeTwoHomeroomDoor } from 'quests/dayOneTakeTwo';

export const useAction = () => {
  const { dayOneTakeTwo } = useAppSelector((state) => ({
    dayOneTakeTwo: state.quest.dayonetaketwo,
  }));

  if (dayOneTakeTwo.phase === 'start') {
    return dayOneTakeTwoHomeroomDoor();
  }

  return gotoScene({ scene: 'school_homeroom', sceneTitle: 'Homeroom' });
};
