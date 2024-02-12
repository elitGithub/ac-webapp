import type { Sequence } from 'components/SequenceContext';

import {
  choices,
  hide,
  moveTo,
  cset,
  qset,
  show,
  start,
  text,
} from 'state/actions';

export const ArtFocusStart = function* (): Sequence {
  yield show('jacklyn', 'smile', { with: { dissolve: 0.5 } });
  yield text("I'd like to sign up for your class, please.", 'mc');
  yield text("What's your name, shooter?", 'jacklyn');
  yield text('[mc].', 'mc');
  yield show('jacklyn', 'thinking');
  yield text("Let's take a look at your criminal record.", 'jacklyn');
  yield text('My what?', 'mc');
  yield text('Your past art. One hot second, por favor.', 'jacklyn');
  //show jacklyn jacklynpose01 with fade
  //TODO: Special
  yield moveTo('jacklyn', 0.078125);
  yield show('jacklyn', 'jacklynpose01');
  yield text(
    "Okay, that's... a good selling point for her class... not going to lie."
  );
  yield text(
    "That has to be against some kind of school policy! But well, who's actually going to complain?"
  );
  yield text(
    'They say that self-expression is the best art, and [jacklyn] is certainly making a point of it.'
  );
  yield text(
    'Sure takes confidence to wear a skirt that short. And bending over in it is like an invitation.'
  );
  yield text('Is she the type who likes to be spanked? ');
  yield text('Hand or paddle?');
  yield text('Hmm... she seems tough, so probably the paddle.');
  yield text(
    "And those fishnet stockings... didn't even know I had a leg fetish until now."
  );
  yield text(
    'This goes to show that not only airhead bimbos can pull off slutty.'
  );
  yield text(
    "It's honestly even hotter that [jacklyn] is highly intelligent and still chooses to dress this way."
  );
  yield text(
    'Math and science used to be my forte... but her string theory seems way more alluring.'
  );
  //TODO: Replays
  //$unlock_replay("jacklyn_string")
  yield moveTo('jacklyn', 0.5);
  yield show('jacklyn', 'neutral');
  yield text("Sorry. That's a no-go.", 'jacklyn');
  yield text('Huh? Why?', 'mc');
  yield show('jacklyn', 'thinking');
  yield text(
    'Your past art is nothing but petty theft and shop-lifting. I want murder in my class.',
    'jacklyn'
  );
  yield show('jacklyn', 'thinking');
  yield moveTo('jacklyn', 0.75);

  const response = yield choices('left', [
    {
      id: 'teacher',
      label: '"Since when can teachers deny a student their education?"',
    },
    {
      id: 'practice',
      label:
        '"I\'ve been practicing a lot since... err, last year. Can I show you?"',
    },
    {
      id: 'lame',
      label:
        '"Art is a stupid subject anyway. Just spatter some paint on a canvas and hang it in a gallery."',
    },
  ]);

  switch (response) {
    case 'teacher':
      yield show('jacklyn', 'thinking');
      yield text(
        'Since when can teachers deny a student their education?',
        'mc'
      );
      yield show('jacklyn', 'neutral');
      yield text(
        "Plug the saltwater fountains, weepy. You'll get yours.",
        'jacklyn'
      );
      yield show('jacklyn', 'smile');
      yield text(
        "All students have access to the shop, you just won't be on my shortlist.",
        'jacklyn'
      );
      yield text("You're still getting a basic education.", 'jacklyn');
      yield text(
        "What about [isabelle]? You haven't even seen her work yet!",
        'mc'
      );
      yield text(
        "Exchange students aren't my dolls to dress up. The bigwigs of the board decide their fate.",
        'jacklyn'
      );
      yield text('Anything I can do to change your mind?', 'mc');
      yield show('jacklyn', 'laughing');
      yield text(
        "See that easel with the blank canvas? Make it your crime scene and we'll talk again.",
        'jacklyn'
      );
      break;
    case 'practice':
      yield show('jacklyn', 'thinking');
      yield moveTo('jacklyn', 0.5);
      yield text(
        "I've been practicing a lot since... err, last year. Can I show you?",
        'mc'
      );
      yield text(
        "Murder isn't all about practice; it's also about passion. Just keep that in your noggin.",
        'jacklyn'
      );
      yield show('jacklyn', 'smile');
      yield text(
        "See that easel with the blank canvas? Make it your crime scene and we'll talk again.",
        'jacklyn'
      );
      break;
    case 'lame':
      yield show('jacklyn', 'thinking');
      yield moveTo('jacklyn', 0.5);
      yield text(
        'Art is a stupid subject anyway. Just spatter some paint on a canvas and hang it in a gallery.',
        'mc'
      );
      yield cset((chars) => ({
        character: 'jacklyn',
        love: chars['jacklyn'].love - 1,
      }));
      yield cset((chars) => ({
        character: 'jacklyn',
        love: chars['jacklyn'].lust - 1,
      }));
      yield show('jacklyn', 'cringe');
      yield text('Art is definitely not for ostrich-heads.', 'jacklyn');
      yield show('jacklyn', 'annoyed');
      yield text(
        "If you ever pull it out of the sand, you're free to show me murder on that empty canvas.",
        'jacklyn'
      );
      break;
  }
  yield hide('jacklyn');
  yield start('art_focus');
  yield qset({
    quest: 'art_focus',
    phase: 'canvas',
  });
};
