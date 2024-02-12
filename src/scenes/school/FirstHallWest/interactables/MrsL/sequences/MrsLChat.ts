// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const MrsLChat = function* (): Sequence {
  yield text("She's probably had enough of my chitchat for today.");
};
