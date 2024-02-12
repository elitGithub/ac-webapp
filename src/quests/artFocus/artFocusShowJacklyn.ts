import type { Sequence } from 'components/SequenceContext';

import {
  choices,
  equip,
  unequip,
  get,
  hide,
  moveTo,
  cset,
  qset,
  show,
  text,
} from 'state/actions';

export const ArtFocusShowJacklyn = function* (): Sequence {
  const jacklynatartclass = yield get(
    (state) => state.quest.art_focus.show_jacklyn === 'brush'
  );
  if (jacklynatartclass) {
    yield show('jacklyn', 'neutral');
    yield text("Excuse me. I've completed the task.", 'mc');
    yield show('jacklyn', 'excited', { with: { dissolve: 0.5 } });
    yield text("Wicked. Let's have a look at it!", 'jacklyn');
    yield text('What do you think?', 'mc');
    yield show('jacklyn', 'annoyed', { with: { dissolve: 0.5 } });
    yield text("It's...", 'jacklyn');
    yield text("A bit plain, don't you think?", 'jacklyn');
    yield text('I put in a lot of hard work.', 'mc');
    yield show('jacklyn', 'cringe', { with: { dissolve: 0.5 } });
    yield text(
      'If you want to be an artist with that style of yours, you need to at least learn how to draw genitals.',
      'jacklyn'
    );
    yield text('Sorry, but try again.', 'jacklyn');
    yield hide('jacklyn');
    yield qset({
      quest: 'art_focus',
      phase: 'artist',
    });
  } else {
    yield show('jacklyn', 'thinking', { with: { dissolve: 0.5 } });
    yield text('Hey, I painted this thing...', 'mc');
    yield show('jacklyn', 'excited', { with: { dissolve: 0.5 } });
    yield text("That's crack on a stick!", 'jacklyn');
    yield text('What did you paint?', 'jacklyn');
    yield text('Just err... went with my gut.', 'mc');
    yield text(
      "I guess it's meant as avant-garde meets surrealism meets abstractism.",
      'mc'
    );
    yield show('jacklyn', 'thinking', { with: { dissolve: 0.5 } });
    yield text(
      "It's a powerful combination. Okay, let's see what you've got.",
      'jacklyn'
    );
    yield text('...', 'mc');
    yield text('...', 'jacklyn');
    yield show('jacklyn', 'smile', { with: { dissolve: 0.5 } });
    yield text("It's not toilet water, that's for sure.", 'jacklyn');
    yield text('Thanks, I guess.', 'mc');
    yield show('jacklyn', 'neutral', { with: { dissolve: 0.5 } });
    yield text("You've got some spark.", 'jacklyn');
    yield text('I was wrong about you, [mc].', 'jacklyn');
    yield show('jacklyn', 'smile', { with: { dissolve: 0.5 } });
    yield text(
      "You've upped your bang from last year. You're welcome to join my special class.",
      'jacklyn'
    );
    yield moveTo('jacklyn', 0.25);
    const response = yield choices('right', [
      {
        id: 'picasso',
        label: '"I\'d like to find my inner Picasso."',
      },
      {
        id: 'wrong',
        label:
          '"I just did it to prove you wrong. I don\'t really care for art."',
      },
    ]);

    switch (response) {
      case 'picasso':
        yield show('jacklyn', 'smile', { with: { dissolve: 0.5 } });
        yield moveTo('jacklyn', 0.5);
        yield text("I'd like to find my inner Picasso.", 'mc');
        yield cset((chars) => ({
          character: 'jacklyn',
          lust: chars['jacklyn'].lust + 1,
        }));
        yield text(
          "Sick. Okay, I'll fill you in about the assignments later.",
          'jacklyn'
        );
        yield hide('jacklyn');
        yield qset({
          quest: 'art_focus',
          finished: true,
        });
        break;
      case 'wrong':
        yield show('jacklyn', 'smile', { with: { dissolve: 0.5 } });
        yield moveTo('jacklyn', 0.5);
        yield text(
          "I just did it to prove you wrong. I don't really care for art.",
          'mc'
        );
        yield text(
          'That has been the sentiment of many great artists throughout history.',
          'jacklyn'
        );
        yield cset((chars) => ({
          character: 'jacklyn',
          love: chars['jacklyn'].love + 1,
        }));
        yield equip('jacklyn', 'right');
        yield show('jacklyn', 'excited', { with: { dissolve: 0.5 } });

        yield text('Yet here we are, admiring their work.', 'jacklyn');
        yield hide('jacklyn');
        yield unequip('jacklyn', 'right');
        yield qset({
          quest: 'art_focus',
          phase: 'done_nofocus',
          finished: true,
        });
        break;
    }
  }
};
