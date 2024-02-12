// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text, cset } from 'state/actions';

export const interact = function* (): Sequence {
  yield set({
    scene: 'school_first_hall_east',
    book_taken: true,
  });

  yield text("Finally, a book that's worth reading...");

  yield text('*"Silver Tongue: Cunnilingus and Linguistic Cunning A-Z."*');

  yield cset(({ mc }) => ({
    character: 'mc',
    charisma: mc.charisma + 1,
  }));
};
