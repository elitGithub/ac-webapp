// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text, get, set, cset } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Someone left a bag of dubious contents here...');

  yield text('If I ever need to rob a bank, I can get the outfit here.');

  const dollar1SpawnedToday = yield get(
    (state) => state.scene.school_first_hall_east.dollar1_spawned_today
  );

  const dollar1TakenToday = yield get(
    (state) => state.scene.school_first_hall_east.dollar1_taken_today
  );

  if (dollar1SpawnedToday && !dollar1TakenToday) {
    yield set({
      scene: 'school_first_hall_east',
      dollar1_taken_today: true,
    });

    yield cset(({ mc }) => ({
      character: 'mc',
      money: mc.money + 20,
    }));
  }

  yield set({
    scene: 'school_first_hall_east',
    vent_ajar: false,
  });
};
