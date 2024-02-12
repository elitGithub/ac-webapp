// Types
import { Sequence } from 'components/SequenceContext';
import { useAppSelector } from 'state/hooks';
// Actions
import { text, qset, show, hide, cset, equip } from 'state/actions';

export const artFocusStart = function* (): Sequence {
  yield text(
    "Even though the minimalism of this canvas is highly attractive, [jacklyn] probably won't feel the same."
  );
  yield text('Need to find some paint to begin with.');
  yield qset({
    quest: 'art_focus',
    phase: 'paint',
  });
};

export const artFocusPermission = function* (): Sequence {
  yield text('Got the brush but first I need permission.');
  yield text("I'm a sucker for authority.");
};

export const artFocusUseItem = function* (): Sequence {
  if (true) {
    //show misc canvas canvas with Dissolve(.5) //todo: showing a non-character scene?
    yield text('Some say my strokes are among the best. Perhaps of all time.');
    yield text('Just a little bit of this and a little bit of that...');
    //show misc canvas brush_stage1 with Dissolve(.5)
    yield text('Mm... Van Gogh can gogh on my vang.');
    //show misc canvas brush_stage2 with Dissolve(.5)
    yield text('Oh! Look at that!');
    yield text('Now for the finishing touches...');
    //show misc canvas brush_stage3 with Dissolve(.5)
    yield text('Perfection.');
    yield text('...');
    yield text('Okay, time to show [jacklyn] and get that A.');
    //hide misc canvas brush_stage3 with Dissolve(.5)
    yield qset({
      quest: 'art_focus',
      phase: 'showjacklyn',
      show_jacklyn: 'brush',
    });
  } else if (false) {
    //elif getattr(item,"tiertwo",False):  //TODO: Item attributes
    //show misc canvas canvas with Dissolve(.5)
    yield text('Not an artist.');
    yield text('Just a boy with a dream.');
    yield text('Just a tiny spark of inspiration.');
    yield text('...');
    //show misc canvas tier2_stage1 with Dissolve(.5)
    yield text('For so many years...');
    yield text('Ugly, lazy, unwanted.');
    yield text('A social outcast filled with rage.');
    //show misc canvas tier2_stage2 with Dissolve(.5)
    yield text('And it burns in my veins, in my eyes, in my brain.');
    yield text('It burns anyone who dares get too close.');
    yield text('Like a whirling inferno, raging through cities.');
    yield text('Nothing is spared. Nothing left but ashes.');
    //show misc canvas tier2_stage3 with Dissolve(.5)
    yield text('"Fuck the world" — that\'s what\'s on this canvas.');
    yield show('jacklyn', 'neutral', {
      flip: false,
      at: 0.5,
      with: {
        appearFrom: 'left',
      },
    });
    yield show('jacklyn', 'neutral');
    yield text('Dude... how did you get those strokes in?', 'jacklyn');
    yield text('Err...', 'mc');
    ("Probably shouldn't tell her I used the [item.title_lower].");
    //hide misc canvas tier2_stage3 with Dissolve(.5)
    yield show('jacklyn', 'smile');
    yield text("That's hot as fuck.", 'jacklyn');
    yield text('Seriously?', 'mc');
    yield show('jacklyn', 'smile');
    yield text(
      "Yeah, the raw emotion. It's tearing me a new asshole!",
      'jacklyn'
    );
    yield text("That's a good thing?", 'mc');
    yield show('jacklyn', 'excited');
    yield text(
      "Shit, duckling. You're talented and don't even know it.",
      'jacklyn'
    );
    yield text(
      'Let me give you a big hush, okay? Art is an extension of our emotions.',
      'jacklyn'
    );
    yield show('jacklyn', 'laughing');
    yield text(
      "There's nothing as boring as a passionless painting.",
      'jacklyn'
    );
    yield text(
      "Can't believe she's gushing over my art, but what she's saying does make some kind of sense."
    );
    yield show('jacklyn', 'smile');
    yield text("Honestly, you've got it.", 'jacklyn');
    yield text(
      'Channeling your rage into the colors and ripping them across the canvas. Makes my left foot all moist.',
      'jacklyn'
    );
    yield text('Thanks, I guess. It did feel good letting it all out.', 'mc');
    yield show('jacklyn', 'neutral');
    yield text("I know what you're saying.", 'jacklyn');
    yield text('Floodgates were meant to be shattered.', 'jacklyn');
    yield show('jacklyn', 'smile');
    yield text(
      "I'll tell you what. You, me, and half a dozen spray cans...",
      'jacklyn'
    );
    //if "jacklyn" in game.pc.phone_contacts: //TODO: Check for phone contacts
    if (false) {
      yield equip('jacklyn', 'right');
      yield show('jacklyn', 'excited');
      yield text(
        "You have my number. Let's go out and make a statement!",
        'jacklyn'
      );
      yield text('Not sure what that means, but it sounds illegal.');
      yield text('Totally my cup of tea.');
      yield qset({
        quest: 'art_focus',
        finished: true,
      });
    } else {
      yield equip('jacklyn', 'right');
      yield show('jacklyn', 'excited');
      yield text(
        "Give me your number and we'll make a statement together.",
        'jacklyn'
      );
      //$mc.add_phone_contact("jacklyn") TODO: adding numbers
      yield text('Not sure what that means, but it sounds illegal.');
      yield text('Totally my cup of tea.');
      yield qset({
        quest: 'art_focus',
        finished: true,
      });
    }
    //$achievement.inspired.unlock() //TODO: Achievemetns
    yield hide('jacklyn');
  } else {
    //show misc canvas canvas with Dissolve(.5)
    yield text(
      'Using my [item.title_lower] instead of a brush is totally avant-garde.'
    );
    yield text(
      "The strokes of a brush wouldn't impress anyone. Least of all an art connoisseur like [jacklyn]."
    );
    yield text('True art requires finesse...');
    //show misc canvas tier1_stage1 with Dissolve(.5)
    yield text('Innovation...');
    //show misc canvas tier1_stage2 with Dissolve(.5)
    yield text('And most importantly... pretentious bullshit.');
    //show misc canvas tier1_stage3 with Dissolve(.5)
    yield text('Mmm... there we are. A masterpiece.');
    yield text('[jacklyn] will surely gush like a fountain over this.');
    //hide misc canvas tier1_stage3 with Dissolve(.5)
    yield qset({
      quest: 'art_focus',
      phase: 'showjacklyn',
      show_jacklyn: 'tierone',
    });
  }
};
