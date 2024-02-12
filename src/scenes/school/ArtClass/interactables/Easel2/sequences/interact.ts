// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Maybe I can finish it...');
  yield text('...');
  yield text('...');
  yield text('Nope. Just made it worse.');
};
