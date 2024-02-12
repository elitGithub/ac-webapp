// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const potted_weeds_interact = function* (): Sequence {
  yield text(
    'Maybe I can use some of the farming equipment inside the hut to plow the meadow, but the door is locked.'
  );

  yield text(
    'Need to find something long and hook-shaped to pull stuff out through the cracks.'
  );
};
