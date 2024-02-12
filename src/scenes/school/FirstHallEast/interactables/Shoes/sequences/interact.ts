// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { get, cset, set } from 'state/actions';

interface Args {
  id: string;
  pile_of_shoes: number;
}

export const interact = function* ({ id, pile_of_shoes }: Args): Sequence {
  const dollar3SpawnedToday = yield get(
    (state) => state.scene.school_first_hall_east.dollar3_spawned_today
  );

  const dollar3TakenToday = yield get(
    (state) => state.scene.school_first_hall_east.dollar3_taken_today
  );

  if (id === 'shoe10' && dollar3SpawnedToday && !dollar3TakenToday) {
    yield set({
      scene: 'school_first_hall_east',
      dollar3_taken_today: true,
    });

    yield cset(({ mc }) => ({
      character: 'mc',
      money: mc.money + 20,
    }));
  }

  yield set({
    scene: 'school_first_hall_east',
    [`${id}_moved`]: true,
    pile_of_shoes: pile_of_shoes + 1,
  });
};
