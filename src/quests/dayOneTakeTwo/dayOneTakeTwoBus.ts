// Actions
import { text } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const dayOneTakeTwoBus = function* (): Sequence {
  yield text(
    'Skipping school on the first day would look bad. Besides, [jo] knows my old tricks.',
    'mc'
  );
};
