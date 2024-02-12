// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Old pieces of gum, candy wrappers, soda cans, and some kind of goo that looks like an alien brain.'
  );
};
