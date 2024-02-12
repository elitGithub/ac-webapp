// Sequences
import { gotoScene } from 'common/sequences/gotoScene';
import { useAppSelector } from 'state/hooks';

//DayOneTakeTwo
import { dayOneTakeTwoStart } from 'quests/dayOneTakeTwo';

export const useAction = () => {
  const { dayOneTakeTwo } = useAppSelector((state) => ({
    dayOneTakeTwo: state.quest.dayonetaketwo,
  }));

  if (!dayOneTakeTwo.started) {
    return dayOneTakeTwoStart();
  }

  return gotoScene({ scene: 'school_entrance', sceneTitle: 'Entrance' });
};
