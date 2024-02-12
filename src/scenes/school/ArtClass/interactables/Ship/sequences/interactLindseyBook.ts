// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, text, addItem } from 'state/actions';

export const interactLindseyBook = function* (): Sequence {
  yield text('Take this, cursed frigate!'); //TODO: effects? vpunch?
  yield text('...');
  yield set({ scene: 'school_art_class', stick_interacted: true });
  yield addItem('mc', 'stick');
  yield text('Ha! Not quite first place worthy anymore, are you?');
  yield text("Let's be honest, it still is.");
};
