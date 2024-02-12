import type { Sequence } from 'components/SequenceContext';
import { useEnergy } from 'state/actions';

import { text } from 'state/features/display';

export const interact = function* (energy: number): Sequence {
  yield useEnergy(energy);

  yield text("I like passing near Flora's room. Always smells so nice.");
};
