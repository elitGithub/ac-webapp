// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    "It looks bad if students start drowning during the first week, so it's school policy to keep it closed."
  );
};
