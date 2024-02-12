// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text(
    "Hmm... I've always wondered who the best hula hooper is. Time to put it to the test!"
  );

  yield text(
    "Anyone wanna give it a try? I'm trying to find the best hula hooper in the school!",
    'mc'
  );

  yield text('...');

  yield text('Okay, maybe another time.');
};
