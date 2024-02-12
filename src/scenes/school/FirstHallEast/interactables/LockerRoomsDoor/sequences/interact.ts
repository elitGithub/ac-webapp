// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text("Imagine the girl's locker room...");

  yield text(
    'Fruity shampoo and sweet perfume. Laughter of bathing nymphs. The tiled garden of forbidden lust.'
  );
};
