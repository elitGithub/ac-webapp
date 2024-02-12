// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, addItem } from 'state/actions';

export const take = function* (): Sequence {
  yield set({
    scene: 'school_art_class',
    candy5_taken: true,
  });

  yield addItem('mc', 'wrapper');
};
