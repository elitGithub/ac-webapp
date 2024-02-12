import type { Sequence } from 'components/SequenceContext';
import { useEnergy } from 'state/actions';

import { set } from 'state/features/scene';

export const take = function* (energy: number): Sequence {
  yield useEnergy(energy);

  yield set({ scene: 'home_bedroom', controller: 'taken' });
};
