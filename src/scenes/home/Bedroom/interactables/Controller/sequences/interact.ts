import type { Sequence } from 'components/SequenceContext';
import { useEnergy } from 'state/actions';

import { text } from 'state/features/display';
import { set } from 'state/features/scene';

export const interact = function* (energy: number): Sequence {
  yield useEnergy(energy);

  yield set({
    scene: 'home_bedroom',
    controller: 'interacted',
  });

  yield text("Controlling my fate. That's the goal here.");
};
