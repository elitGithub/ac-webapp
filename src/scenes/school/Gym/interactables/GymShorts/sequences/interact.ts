// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text("I hope their owner wasn't an ugly girl.");

  yield text('That would really kill my vibe.');
};
