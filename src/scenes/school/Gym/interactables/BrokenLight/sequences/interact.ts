// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    "It's just a lamp. Nothing to worry about. It's not like it could fall down at any moment and hit you on the head."
  );

  yield text(
    "It's not like you'll pass out from the impact and pee yourself for all the school to see. It's just a lamp."
  );
};
