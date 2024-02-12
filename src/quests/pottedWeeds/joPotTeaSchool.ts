// Sequence: joPotTeaSchool
import type { Sequence } from 'components/SequenceContext';

import { qset, show, text } from 'state/actions';

// label quest_jo_pot_tea_school:
export const joPotTeaSchool = function* (): Sequence {
  // show jo confident with Dissolve(.5)
  yield show('jo', 'confident', {
    with: {
      dissolve: 0.5,
    },
  });

  // jo confident "What's with the smile, kiddo?"
  yield text("What's with the smile, kiddo?", 'jo');

  // mc "I've... learned to work the lands."
  yield text("I've... learned to work the lands.", 'mc');

  // jo smile  "I'm glad you have!"
  yield show('jo', 'smile');
  yield text("I'm glad you have!", 'jo');

  // jo smile "Is that a metaphor for something? I'm struggling to keep up with the slang."
  yield text(
    "Is that a metaphor for something? I'm struggling to keep up with the slang.",
    'jo'
  );

  // jo eyeroll "Last night [flora] told me that her new hair dryer blows her skirt up."
  yield show('jo', 'eyeroll');
  yield text(
    'Last night Flora told me that her new hair dryer blows her skirt up.',
    'jo'
  );

  // jo sarcastic "But apparently that just means it's really good and she's excited about it."
  yield show('jo', 'sarcastic');
  yield text(
    "But apparently that just means it's really good and she's excited.",
    'jo'
  );

  // mc "Right... I'm sure that's what it means. [jacklyn]'s a bad influence on her."
  yield text(
    "Right... I'm sure that's what it means. Jacklyn's a bad influence on her.",
    'mc'
  );

  // mc "Anyway, I meant I've gotten into agriculture."
  yield text("Anyway, I meant I've gotten into agriculture.", 'mc');

  // jo smile "That is great news! I'm glad you're finally interested in something other than your computer and cartoons."
  yield show('jo', 'smile');
  yield text(
    "That is great news! I'm glad you're finally interested in something other than your computer and cartoons.",
    'jo'
  );

  // mc "I actually grew some plants and I've made tea from their leaves. It's supposed to help with throat pain!"
  yield text(
    "I actually grew some plants and I've made tea from their leaves. It's supposed to help with throat pain!",
    'mc'
  );

  // jo concerned "You did all that for me?"
  yield show('jo', 'concerned');
  yield text('You did all that for me?', 'jo');

  // mc "Yes, is that so hard to believe?"
  yield text('Yes, is that so hard to believe?', 'mc');

  // jo confident "Of course not. I'm really proud of you. Empathy is a sign of maturity."
  yield show('jo', 'confident');
  yield text(
    "Of course not. I'm really proud of you. Empathy is a sign of maturity.",
    'jo'
  );

  // mc "Would you like a cup?"
  yield text('Would you like a cup?', 'mc');

  // jo smile "I most definitely do, but it'll have to wait until we get home."
  yield show('jo', 'smile');
  yield text(
    "I most definitely do, but it'll have to wait until we get home.",
    'jo'
  );

  // jo smile "The truly good teas often have a strong smell and I have a board meeting later."
  yield text(
    'The truly good teas often have a strong smell and I have a board meeting later.',
    'jo'
  );

  // $quest.jo_potted["school_talk"] = True
  yield qset({
    quest: 'potted_weeds',
    school_talk: true,
  });
};
