import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  // show jo excited with Dissolve(.5)
  yield show('jo', 'excited', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jo["talk_limit_today"]+=1
  yield cset(({ jo }) => ({
    character: 'jo',
    talk_limit_today: jo.talk_limit_today + 1,
  }));

  // jo excited "I think the new curriculum is going to fit you perfectly."
  yield text('I think the new curriculum is going to fit you perfectly.', 'jo');

  // jo laughing "You're always a bit slow to get started in the mornings."
  yield text("You're always a bit slow to get started in the mornings.", 'jo');

  // jo excited "Besides, I'll be able to keep a close track of how you're doing."
  yield text(
    "Besides, I'll be able to keep a close track of how you're doing.",
    'jo'
  );

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
