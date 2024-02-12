// Sequences
import { gotoScene } from 'common/sequences/gotoScene';

import { useAppSelector } from 'state/hooks';
import { dayOneTakeTwoBus } from 'quests/dayOneTakeTwo';

export const useAction = () => {
  const { dayOneTakeTwo } = useAppSelector((state) => ({
    dayOneTakeTwo: state.quest.dayonetaketwo,
  }));

  if (dayOneTakeTwo.phase === 'start') {
    return dayOneTakeTwoBus();
  }

  return gotoScene({scene: 'home_kitchen', sceneTitle: 'Kitchen'});
};
