// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { goto, show, text } from 'state/actions';

export const gotoKitchen = function* (): Sequence {
  yield goto({ scene: 'home_kitchen', sceneTitle: 'Kitchen' });
};
