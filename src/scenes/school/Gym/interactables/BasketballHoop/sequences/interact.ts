// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('The only thing that matters here is hitting the shot.');

  yield text("If you miss, everyone will know you're a loser.");
};
