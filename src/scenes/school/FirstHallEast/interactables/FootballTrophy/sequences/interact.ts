// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Despite not winning anything in ten years, the football team still think of themselves as winners, and of everyone else as losers.'
  );

  yield text(
    'Despite having their own locker room down at the football field, they still come here to bask in the glory.'
  );
};
