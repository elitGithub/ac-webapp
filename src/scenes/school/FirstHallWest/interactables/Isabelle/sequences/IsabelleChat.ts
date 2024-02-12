// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/features/display';

export const IsabelleChat = function* (): Sequence {
  yield text("She's probably had enough of my chitchat for today.");
};
