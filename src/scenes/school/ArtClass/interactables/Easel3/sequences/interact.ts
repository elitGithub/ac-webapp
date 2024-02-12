// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Going to need a brush. Finger painting is probably frowned on in these highly pretentious circles.'
  );
};
