// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Have you ever had the honor of eating your turkey mayo sandwhich surrounded by poop particles?'
  );

  yield text('I have.');
};
