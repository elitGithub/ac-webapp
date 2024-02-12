// Libraries
import { useAppSelector } from 'state/hooks';

// Sequences
import { gotoScene } from 'common/sequences/gotoScene';
import { lindseyRescueEnding } from 'quests/loserToTheRescue';

export const useAction = () => {
  const { lindsey_rescue } = useAppSelector((state) => ({
    lindsey_rescue: state.quest.loser_to_the_rescue,
  }));

  if (lindsey_rescue.phase === 'peek' || lindsey_rescue.phase === 'leave') {
    return lindseyRescueEnding();
  }

  return gotoScene({scene: 'school_ground_floor_west', sceneTitle: 'West Ground Floor'});
};
