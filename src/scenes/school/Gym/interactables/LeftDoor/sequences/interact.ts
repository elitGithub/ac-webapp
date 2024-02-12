// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text("Why can't opening the door fulfill my exercise quota?");
};
