// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { closeOverlay } from 'state/actions';

export const closeOverlaySequence = function* (): Sequence {
  yield closeOverlay();
};
