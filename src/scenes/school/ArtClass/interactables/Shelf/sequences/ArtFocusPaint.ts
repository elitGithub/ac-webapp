// Types
import { Sequence } from 'components/SequenceContext';
import { useAppSelector } from 'state/hooks';
// Actions
import { set, text, qset, get } from 'state/actions';
import { hasItem } from 'state/features/character';

export const ArtFocusPaint = function* (): Sequence {
  const mcbrush = yield get((state) =>
    state.character.mc.inventory.includes('brush')
  );
  yield text("You can't really paint without paint, it's in the word itself.");
  yield text("Luckily, there's plenty to go around.");
  yield text("Let's just pick a few random buckets.");
  yield text(
    "A real artist doesn't choose his colors, he lets the colors choose him."
  );
  yield text('...');
  yield set({
    scene: 'school_art_class',
    easel_paint_buckets: true,
  });
  yield text(
    'All right, the paint is ready. Now, I just need something to paint with.'
  );
  if (mcbrush) {
    yield qset({
      quest: 'art_focus',
      phase: 'artist',
    });
  } else {
    yield qset({
      quest: 'art_focus',
      phase: 'brush',
    });
  }
};
