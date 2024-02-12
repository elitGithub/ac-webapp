import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  // show jo eyeroll with Dissolve(.5)
  yield show('jo', 'eyeroll', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jo["talk_limit_today"]+=1
  yield cset(({ jo }) => ({
    character: 'jo',
    talk_limit_today: jo.talk_limit_today + 1,
  }));

  // jo eyeroll "Now is not the time to talk about those things."
  yield text('Now is not the time to talk about those things.', 'jo');

  // jo eyeroll "He's gone and that's all you need to know."
  yield text("He's gone and that's all you need to know.", 'jo');

  // jo flirty "Besides, we're doing just fine, aren't we?"
  yield text("Besides, we're doing just fine, aren't we?", 'jo');

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
