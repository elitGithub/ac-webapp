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

  // jo smile "Do you still like swings, honey?"
  yield text('Do you still like swings, honey?', 'jo');

  // jo confident "Going to the park with you and [flora] used to be the highlight of my week."
  yield text(
    'Going to the park with you and [flora] used to be the highlight of my week.',
    'jo'
  );

  // jo confident "How time flies!"
  yield text('How time flies!', 'jo');

  // hide jo with Dissolve(.5)
  yield hide('jo', {
    with: {
      dissolve: 0.5,
    },
  });
};
