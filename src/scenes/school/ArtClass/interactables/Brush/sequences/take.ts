// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { set, qset, addItem, text } from 'state/actions';

export const take = function* (): Sequence {
  yield set({
    scene: 'school_art_class',
    brush_taken: true,
  });

  yield addItem('mc', 'brush');
};

export const artFocusTake = function* (): Sequence {
  yield set({
    scene: 'school_art_class',
    brush_taken: true,
  });
  yield text(
    "The tool of the artist's trade. Much like the knight's sword and the writer's affinity for bullshit."
  );
  yield addItem('mc', 'brush');
  yield qset({
    quest: 'art_focus',
    phase: 'artist',
  });
};
