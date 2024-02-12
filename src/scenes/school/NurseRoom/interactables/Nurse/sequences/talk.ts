// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { hide, show, text } from 'state/actions';

export const talk = function* (): Sequence {
  yield show('nurse', 'neutral');
  yield text('Placeholder conversation.');

  yield hide('nurse', {
    with: {
      dissolve: 0.5,
    },
  });
};
