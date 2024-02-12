// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text("Stray balls, man's worst enemy.");

  yield text("As soon as you sit down, there's a risk of instant pain.");

  yield text('Why make myself a more visible target, though?');
};
