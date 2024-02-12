// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('This ship was a group project in my sophomore year.');
  yield text(
    'The anticipation of building it was one of the few things that brought me genuine excitement that year.'
  );
  yield text(
    'Of course, [maxine] and [lindsey] decided to kick me out of the group. And, of course, they ended up winning the art contest.'
  );
  yield text('That one still stings.');
  yield set({ scene: 'school_art_class', wooden_ship_interacted: true });
};
