// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text("There's only one proper use for these paddles...");

  yield text('Hard and fast.');

  yield text('Mercilessly bringing the pain.');

  yield text('Like, slap, slap, slap, slap!');

  yield text(
    'Hitting that ball over the net! Yeah, ping pong is serious business.'
  );
};
