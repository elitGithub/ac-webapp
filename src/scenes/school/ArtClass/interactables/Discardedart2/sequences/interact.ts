// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'This is what discarded avant-garde art looks like. Very similar to the undiscarded pieces.'
  );
};
