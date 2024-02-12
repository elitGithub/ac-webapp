// Types
import { Sequence } from 'components/SequenceContext';
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Sometimes during class, I would brush the bristles against my skin to simulate human contact.'
  );
};
