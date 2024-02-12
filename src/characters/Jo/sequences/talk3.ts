import type { Sequence } from 'components/SequenceContext';

import { cset, hide, show, text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  // show jo smile with Dissolve(.5)
  yield show('jo', 'smile', {
    with: {
      dissolve: 0.5,
    },
  });

  // $jo["talk_limit_today"]+=1
  yield cset(({ jo }) => ({
    character: 'jo',
    talk_limit_today: jo.talk_limit_today + 1,
  }));

  // jo smile "There's nothing more important than your grades."
  yield text("There's nothing more important than your grades.", 'jo');

  // jo smile "Your future rests on those marks. I know you've been struggling in the past, but if [flora] can do it, so can you!"
  yield text(
    'Your future rests on those marks. I know you’ve been struggling in the past, but if [flora] can do it, so can you!',
    'jo'
  );

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
