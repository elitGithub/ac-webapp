// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('All these trophies were won by the swim team. What a legacy.');

  yield text(
    "Apart from the big football trophy over there, we haven't succeeded in any other sport."
  );
};
