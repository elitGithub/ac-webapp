// Actions
import { goto, set, qset, complete } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const lindseyRescueEnding = function* (): Sequence {
  // call goto_school_ground_floor_west
  yield goto({ scene: 'school_ground_floor_west', sceneTitle: 'West Hall' });

  // $school_nurse_room["curtain_off"] = True
  yield set({
    scene: 'school_nurse_room',
    curtain: 'open',
  });

  // $quest.lindsey_nurse.finish()
  yield qset({
    quest: 'loser_to_the_rescue',
    phase: 'done',
  });
  yield complete('loser_to_the_rescue');
};
