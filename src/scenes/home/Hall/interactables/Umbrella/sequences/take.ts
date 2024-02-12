// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, addItem } from 'state/actions';

export const take = function* (): Sequence {
  yield set({ scene: 'home_hall', umbrella_taken: true });

  yield addItem('mc', 'umbrella');
};
