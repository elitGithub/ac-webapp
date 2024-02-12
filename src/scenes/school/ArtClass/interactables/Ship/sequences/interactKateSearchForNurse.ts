// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interactKateSearchForNurse = function* (): Sequence {
  yield text(
    'The time will come for this cursed frigate. If only I could release the Kraken upon it.'
  );
};
