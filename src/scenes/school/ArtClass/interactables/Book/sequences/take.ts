// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, cset } from 'state/actions';

export const take = function* (): Sequence {
  yield set({
    scene: 'school_art_class',
    book_taken: true,
  });

  yield cset(({ mc }) => ({
    character: 'mc',
    intellect: mc.intellect + 1,
  }));
};
