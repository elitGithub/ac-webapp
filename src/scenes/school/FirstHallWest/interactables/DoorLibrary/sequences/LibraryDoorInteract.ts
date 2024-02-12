// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const LibraryDoorInteract = function* (): Sequence {
  yield text('Right, the library is being renovated.');

  yield text("Last time around, it didn't open until Christmas...");
};
