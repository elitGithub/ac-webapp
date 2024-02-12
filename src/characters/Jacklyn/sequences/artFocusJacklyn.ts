import type { Sequence } from 'components/SequenceContext';
import { useAppSelector } from 'state/hooks';

import { cset, choices, hide, show, text, equip, unequip } from 'state/actions';

export const artFocusJacklyn = function* (): Sequence {
  const show_brush = useAppSelector(
    (state) => state.quest.art_focus.show_jacklyn === 'brush'
  );

  if (show_brush) {
    yield show('jacklyn', 'neutral', {
      with: {
        dissolve: 0.5,
      },
    });
    yield text("Excuse me. I've completed the task.", 'mc');
    yield show('jacklyn', 'excited');
    yield text("Wicked. Let's have a look at it!", 'jacklyn');
    yield text('What do you think?', 'mc');
    yield show('jacklyn', 'annoyed');
    yield text("It's...", 'jacklyn');
    yield text("A bit plain, don't you think?", 'jacklyn');
    yield text('I put in a lot of hard work.', 'mc');
    yield show('jacklyn', 'cringe');
    yield text(
      'If you want to be an artist with that style of yours, you need to at least learn how to draw genitals.',
      'jacklyn'
    );
    yield text('Sorry, but try again.', 'jacklyn');
  } else {
    yield show('jacklyn', 'thinking', {
      with: {
        dissolve: 0.5,
      },
    });
    yield text('Hey, I painted this thing...', 'mc');
    yield show('jacklyn', 'excited');
    yield text("That's crack on a stick!", 'jacklyn');
    yield text('What did you paint?', 'jacklyn');
    yield text('Just err... went with my gut.', 'mc');
    yield text(
      "I guess it's meant as avant-garde meets surrealism meets abstractism.",
      'mc'
    );
    yield show('jacklyn', 'thinking');
    yield text(
      "It's a powerful combination. Okay, let's see what you've got.",
      'jacklyn'
    );
    yield text('...', 'mc');
    yield show('jacklyn', 'smile');
    yield text("It's not toilet water, that's for sure.", 'jacklyn');
    yield text('Thanks, I guess.', 'mc');
    yield show('jacklyn', 'neutral');
    yield text("You've got some spark.", 'jacklyn');
    yield text('I was wrong about you, [mc].', 'jacklyn');
    yield show('jacklyn', 'smile');
    yield text(
      "You've upped your bang from last year. You're welcome to join my special class.",
      'jacklyn'
    );

    const choice = yield choices('right', [
      {
        id: 'focus',
        label: "I'd like to find my inner Picasso.",
      },
      {
        id: 'no_focus',
        label: "I just did it to prove you wrong. I don't really care for art.",
      },
    ]);

    if (choice === 'focus') {
      yield show('jacklyn', 'smile');
      yield text("I'd like to find my inner Picasso.", 'mc');
      //$jacklyn.lust+=1
      yield show('jacklyn', 'excited');
      yield text(
        "Sick. Okay, I'll fill you in about the assignments later.",
        'jacklyn'
      );
      yield hide('jacklyn', {
        with: {
          dissolve: 0.5,
        },
      });
      //$quest.jacklyn_art_focus.finish()
    } else {
      yield show('jacklyn', 'smile');
      yield text(
        "I just did it to prove you wrong. I don't really care for art.",
        'mc'
      );
      yield show('jacklyn', 'excited');
      yield text(
        'That has been the sentiment of many great artists throughout history.',
        'jacklyn'
      );
      //$jacklyn.love+=1
      yield equip('jacklyn', 'right');
      yield text('Yet here we are, admiring their work.', 'jacklyn');
      yield hide('jacklyn', {
        with: {
          dissolve: 0.5,
        },
      });
      yield unequip('jacklyn', 'right');
      //$quest.jacklyn_art_focus.finish()
    }
  }
};
