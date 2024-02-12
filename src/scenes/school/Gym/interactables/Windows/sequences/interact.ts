// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Out there?');

  yield text('Or in here?');

  yield text("Impossible to say what's worst.");
};
