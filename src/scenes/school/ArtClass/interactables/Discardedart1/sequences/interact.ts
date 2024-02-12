// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    "Trying until you succeed. Or in Chad's case, until you break the easel."
  );
};
