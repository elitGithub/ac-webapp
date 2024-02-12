// Actions
import { text } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const dayOneTakeTwoGroundFloorExitArrow = function* (): Sequence {
  yield text(
    'The compulsion to escape eclipses my senses, and this is only the first day.'
  );
};
