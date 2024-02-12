import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const jacklynTalkOne = function* (): Sequence {
  yield show('jacklyn', 'smile', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jacklyn["talk_limit_today"]+=1
  yield cset(({ jacklyn }) => ({
    character: 'jacklyn',
    talk_limit_today: jacklyn.talk_limit_today + 1,
  }));

  // jacklyn smile "There's nothing more important than your grades."
  yield text("Vision. That's the real x-factor in art.", 'jacklyn');

  // jacklyn smile "Your future rests on those marks. I know you've been struggling in the past, but if [flora] can do it, so can you!"
  yield text(
    "You can have all the mechanical skill in the world. Without a vision, you're just another wall-scrubber.",
    'jacklyn'
  );

  // hide jacklyn with Dissolve(.5)
  yield hide('jacklyn', {
    with: {
      dissolve: 0.5,
    },
  });
};
