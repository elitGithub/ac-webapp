// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Just a normal umbrella without any backstory or anything.');

  yield set({
    scene: 'home_hall',
    umbrella_interacted: true,
  });
};
