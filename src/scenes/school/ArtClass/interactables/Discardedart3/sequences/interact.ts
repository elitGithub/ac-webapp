// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Old artwork, left to roll aimlessly across the desert roads of the art classroom.'
  );
};
