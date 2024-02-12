// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'No human language can properly express the majestic beauty of this piece.'
  );
  yield text('The man who painted it...');
  yield text('Albert Einstein.');
};
