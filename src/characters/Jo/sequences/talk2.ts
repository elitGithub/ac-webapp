import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  // show jo thinking with Dissolve(.5)
  yield show('jo', 'thinking', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jo["talk_limit_today"]+=1
  yield cset(({ jo }) => ({
    character: 'jo',
    talk_limit_today: jo.talk_limit_today + 1,
  }));

  // jo thinking "Learning the important dates of the year is part of growing up."
  yield text(
    'Learning the important dates of the year is part of growing up.',
    'jo'
  );

  // jo thinking "Birthdays especially. I don't want to hear any excuses this year."
  yield text(
    "Birthdays especially. I don't want to hear any excuses this year.",
    'jo'
  );

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
