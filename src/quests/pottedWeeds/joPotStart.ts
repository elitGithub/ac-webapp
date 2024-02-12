// Sequence: joPotStart
import type { Sequence } from 'components/SequenceContext';

import {
  choices,
  equip,
  get,
  hide,
  moveTo,
  qset,
  show,
  start,
  text,
} from 'state/actions';

// label quest_jo_pot_start:
export const joPotStart = function* (): Sequence {
  // show jo confident with Dissolve(.5)
  yield show('jo', 'confident', {
    at: 0.5,
    with: {
      dissolve: 0.5,
    },
  });

  // jo "How's it going, honey?"
  yield text("How's it going, honey?", 'jo');

  // mc "Not too shabby. I've been on a—"
  yield text("Not too shabby. I've been on a-", 'mc');

  // jo thinking_phone "Sorry, I have to take this."
  yield equip('jo', 'phone');
  yield show('jo', 'thinking');
  yield text('Sorry, I have to take this.', 'jo');

  // "Disruption always comes at the perfect timing when I'm about to tell her about something."
  yield text(
    "Disruption always comes at the perfect timing when I'm about to tell her about something."
  );
  // "Well, guess she won't know about the glade or its satanic cult of beavers."
  yield text(
    "Well, guess she won't know about the glade or its satanic cult of beavers."
  );
  // "Or how I single-handedly defeated their leader..."
  yield text('Or how I single-handedly defeated their leader...');

  // jo thinking_phone "It's the doctor."
  yield text("It's the doctor.", 'jo');

  // jo thinking_phone "Tell me later, okay?"
  yield text('Tell me later, okay?', 'jo');

  // show jo thinking_phone at disappear_to_left
  yield hide('jo', {
    with: {
      disappearTo: 'left',
    },
  });

  // "That's just typical."
  yield text("That's just typical.");

  // show flora confident flip at appear_from_right
  // flora confident flip "You look like someone punched you in the face."
  yield show('flora', 'confident', {
    at: 0.5,
    flip: true,
    with: {
      appearFrom: 'right',
    },
  });
  yield text('you look like someone punched you in the face.', 'flora');

  // mc "Thanks for noticing."
  yield text('Thanks for noticing.', 'mc');

  // flora excited  "I was more interested in how one would go about doing that."
  yield show('flora', 'excited');
  yield text(
    'I was more interested in how one would go about doing that.',
    'flora'
  );

  // mc "..."
  yield text('...', 'mc');

  // flora neutral flip "So, who is [jo] talking to?"
  // show flora neutral flip at move_to(.75)
  yield text('So, who is Jo talking to?', 'flora');
  yield show('flora', 'neutral', {
    at: 0.75,
  });

  const whoCalled = yield choices('left', [
    {
      id: 'adoption',
      label: '"The adoption services. You\'re getting a new home!"',
    },
    { id: 'antarctica', label: '"An Antarctica researcher."' },
    { id: 'internship', label: '"Your internship. They want me instead."' },
  ]);

  switch (whoCalled) {
    case 'adoption':
      yield show('flora', 'neutral');
      yield moveTo('flora', 0.5);
      yield text("I'm eighteen, idiot.", 'flora');

      yield text("Could've fooled me.", 'mc');

      yield show('flora', 'sarcastic');
      yield text('To be fair, most tings do.', 'flora');

      yield text('...', 'mc');
      yield text(
        "I'm serious. Sometimes I forget you're an adult now. And that's not meant to be an insult.",
        'mc'
      );

      yield show('flora', 'confused');
      yield text('What is it meant to be?', 'flora');

      yield text(
        "I don't know. I guess I should start treating you as a grown-up.",
        'mc'
      );

      yield show('flora', 'confused');
      // TODO: flip
      yield text('Are you feeling okay?', 'flora');

      yield text('Yes! Learn to take a compliment.', 'mc');
      // TODO: $flora.love+=1
      yield show('flora', 'thinking');
      // TODO:
      yield text('Was that a compliment?', 'flora');
      yield text('Yes... sort of.', 'mc');

      break;
    case 'antarctica':
      yield show('flora', 'neutral', {
        flip: true,
        at: 0.5,
      });
      yield text('An Antarctica researcher.', 'mc');
      yield text(
        "They've found an ancient civilization buried in the ice.",
        'mc'
      );

      yield show('flora', 'flirty');
      yield text('What kind of civilization?', 'flora');

      yield text(
        "I don't know, some elder gods or something. Wasn't really paying attention.",
        'mc'
      );

      // TODO: $flora.lust += 1

      yield show('flora', 'concerned');
      yield text('Oh em gee, stop lying!', 'flora');
      break;
    case 'internship':
      yield show('flora', 'neutral', {
        flip: true,
        at: 0.5,
      });

      yield text('Your internship. They want me instead.', 'mc');

      yield show('flora', 'laughing');
      yield text("That's actually funny!", 'flora');
      yield text("Too bad I don't intern at the comedy club.", 'flora');

      yield text("I don't really have a comeback for that.", 'mc');

      const cookingChilliFinished = yield get(
        (state) => state.quest.cooking_chilli.finished
      );

      if (cookingChilliFinished) {
        yield text(
          "Only that I'm surprised that there's anyone left alive there after that chili.",
          'mc'
        );

        yield show('flora', 'angry');
        yield text('My chili was great!', 'flora');

        yield text(
          'I know at least one pair of lips that would disagree...',
          'mc'
        );

        yield show('flora', 'thinking');
        yield text('...', 'flora');

        yield show('flora', 'cringe');
        yield text('Gross!', 'flora');

        yield text("I don't think they're that gross.", 'mc');

        // TODO: $flora.lust+=1
        yield show('flora', 'angry');
        yield text('Can you stop talking about my pussy?', 'flora');

        yield text('Fine. We can revisit the topic later.');
      } else {
        // mc "Only that successful comedians earn a lot of money."
        yield text('Only that successful comedians earn a lot of money.', 'mc');
        // flora sarcastic flip "Who said anything about successful?"
        yield show('flora', 'sarcastic', {
          flip: true,
        });
        yield text('Who said anything about successful?', 'flora');
        // mc "Ugh..."
        yield text('Ugh...', 'mc');
      }

      break;
  }

  // mc "Anyway, if you must know, [jo] said it was the doctor calling."
  yield text('Anyway, if you must know, [jo] said it was the doctor calling.');

  // flora sad "Is she okay?"
  yield show('flora', 'sad');
  yield text('Is she okay?');

  // mc "I don't know. She doesn't tell me these things."
  yield text("I don't know. She doesn't tell me these things.", 'mc');

  yield text("Maybe it's her throat again?", 'flora');

  yield text('Right, I totally forgot about that.');
  yield text(
    'When Jo worked her way to the top of the school board, the stress gave her some sort of chronic trachea ache.'
  );
  yield text('Last time around, Flora helped cure it somehow.');
  yield text(
    "Not sure how, but she put Flora's name alone on her will after that."
  );

  yield show('flora', 'sad', {
    at: 0.75,
  });

  yield show('jo', 'confident', {
    at: 0.25,
    with: {
      appearFrom: 'left',
    },
  });
  yield text('What are you two whispering about?', 'jo');

  yield show('flora', 'neutral', { flip: true });
  yield text(
    "Just wondering how you're feeling. Is it your throat again?",
    'flora'
  );

  yield show('jo', 'thinking');
  yield text(
    "Yes, it's been starting to act up again. Thanks for remembering, sweetie.",
    'jo'
  );

  yield show('flora', 'sad');
  yield text('Wish I could do something to help.', 'flora');

  yield show('jo', 'laughing', { flip: true });
  yield text(
    'Aw, sweetheart. You really make these old bones hurt a little less.',
    'jo'
  );

  yield text('Hmm... this is going down the same path as last time...');
  yield text(
    'Need to do something about it. Flora is already her favorite, but this feels like one of those crossroad moments.'
  );
  yield text(
    'Surely, there must be some information about it on the internet.'
  );

  yield hide('jo', { with: { dissolve: 0.5 }, flip: true });
  yield hide('flora', { with: { dissolve: 0.5 } });

  yield start('potted_weeds');
  yield qset({
    quest: 'potted_weeds',
    phase: 'internet',
  });
};
