// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'The thing that no one understands is that there are no villains or heroes.'
  );

  yield text('...');

  yield text('Not sure where I was going with that...');
};
