// Actions
import { text, qset } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const mrslPoolPoolClosed = function* (): Sequence {
  // "There's a notice taped to the door..."
  yield text("There's a notice taped to the door...");

  // "{i}\"Due to the amounts of soggy confetti in the filters last year, the pool will remain closed until after the Newfall Independence Day festivities.\"{/}"
  yield text(
    '*"Due to the amounts of soggy confetti in the filters last year, the pool will remain closed until after the Newfall Independence Day festivities."*'
  );

  // "Oh, right. That happened."
  yield text('Oh, right. That happened.');

  // "Luckily, no one found out it was me trying to ruin it."
  yield text('Luckily, no one found out it was me trying to ruin it.');

  // "Not sure what [mrsl]'s thoughts are regarding the swim team tryouts..."
  yield text(
    "Not sure what [mrsl]'s thoughts are regarding the swim team tryouts..."
  );

  // "How am I supposed to feast my eyes upon the flesh of the innocent now?"
  yield text(
    'How am I supposed to feast my eyes upon the flesh of the innocent now?'
  );

  // $quest.poolside_story.advance("new_plan")
  yield qset({
    quest: 'poolside_story',
    phase: 'new_plan',
  });
};
