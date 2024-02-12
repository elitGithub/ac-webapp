// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('This is where all the pranksters find their equipment.');
  yield text(
    "It's so easy to place a bucket of paint over a doorway and just watch an unsuspecting victim get drenched."
  );
  yield text('That victim is usually me.');
};
