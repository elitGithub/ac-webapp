// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'The door is locked, but from the cracks in the wall there seems to be all sorts of old farming equipment inside.'
  );
};
