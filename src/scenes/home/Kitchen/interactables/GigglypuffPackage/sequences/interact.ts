// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    'Letting it sit too long on the counter might cause all sorts of uncomfortable questions.'
  );

  yield set({
    scene: 'home_kitchen',
    gigglypuff_interacted: true,
  });
};
