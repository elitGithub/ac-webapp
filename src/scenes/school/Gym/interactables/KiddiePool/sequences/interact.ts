// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('They talk about being tossed into the deep end...');

  yield text('This is the opposite of that.');
};
