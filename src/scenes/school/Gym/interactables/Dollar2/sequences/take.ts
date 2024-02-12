// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, cset } from 'state/actions';

export const take = function* (): Sequence {
  yield set({
    scene: 'school_gym',
    dollar2_taken_today: true,
  });

  yield cset(({ mc }) => ({
    character: 'mc',
    money: mc.money + 20,
  }));
};
