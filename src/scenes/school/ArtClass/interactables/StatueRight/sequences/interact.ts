// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Oh sweet Persephone.');
  yield text("You're the nicest girl in this whole damn school.");
};
