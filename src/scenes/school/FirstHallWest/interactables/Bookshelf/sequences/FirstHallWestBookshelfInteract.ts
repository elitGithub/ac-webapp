// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const FirstHallWestBookshelfInteract = function* (): Sequence {
  yield text('This bookcase is brimming with classics.');
  yield text(
    '{i}"Food for Thought & Words for Food (Please!)" by Edgar Allan Hobo{/}'
  );
  yield text(
    '{i}"Book of the Dammed: the Beaver Encyclopedia" by J. J. Timberlake{/}'
  );
  yield text(
    '{i}"So, You Want to Burn Stuff? — the Pyromaniac\'s Guide to Safe Fires"{/}'
  );
};
