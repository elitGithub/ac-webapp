// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'You gotta make sure to binge three sodas and two bags of chips after exercising.'
  );

  yield text('How else are you going to stay ahead of the fat-burning curve?');
};
