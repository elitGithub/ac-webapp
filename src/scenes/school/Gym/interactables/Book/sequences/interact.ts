// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text, cset } from 'state/actions';

export const interact = function* (): Sequence {
  yield set({
    scene: 'school_gym',
    book_taken: true,
  });

  yield text("Holy shit, it's Chad's diary! I had no idea he could write.");

  yield text(
    'All the ancient secrets and techniques to become the perfect male shall finally be mine!'
  );

  yield text("Fuck, it's heavy...");

  yield text('And... all the pages are blank...');

  yield text('Oh, well. At least I got my daily workout.');

  yield cset(({ mc }) => ({
    character: 'mc',
    strength: mc.strength + 1,
  }));
};
