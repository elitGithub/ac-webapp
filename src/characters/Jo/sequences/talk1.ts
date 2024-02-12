import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  // show jo neutral with Dissolve(.5)
  yield show('jo', 'neutral', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jo["talk_limit_today"]+=1
  yield cset(({ jo }) => ({
    character: 'jo',
    talk_limit_today: jo.talk_limit_today + 1,
  }));

  // jo neutral "Remember your 7 p.m. curfew."
  yield text('Remember your 7 p.m. curfew.', 'jo');

  // jo neutral "I don't want you out causing any more trouble than you already have."
  yield text(
    "I don't want you out causing any more trouble than you already have.",
    'jo'
  );

  // jo confident "Besides, I want to cook more dinners for you and [flora]."
  yield show('jo', 'confident');
  yield text('Besides, I want to cook more dinners for you and Flora.', 'jo');

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
