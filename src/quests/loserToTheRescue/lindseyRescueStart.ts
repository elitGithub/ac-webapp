// Actions
import {
  show,
  text,
  get,
  qset,
  clearText,
  pause,
  hide,
  start,
  choices,
  cset,
  set,
  goto,
  complete,
  equip,
  unequip,
} from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const lindseyRescueStart = function* (): Sequence {
  // show isabelle smile with Dissolve(.5)
  yield show('isabelle', 'smile', {
    at: 0.5,
    with: {
      dissolve: 0.5,
    },
  });

  // isabelle smile "Thanks for showing me around, [mc]!"
  yield text('Thanks for showing me around, [mc]!', 'isabelle');

  // isabelle laughing "Apart from the run-in with [kate], this was quite the pleasant tour."
  yield show('isabelle', 'laughing');
  yield text(
    'Apart from the run-in with [kate], this was quite the pleasant tour.',
    'isabelle'
  );

  // mc "No problem!"
  yield text('No problem!', 'mc');

  // "The story with [kate] is, however, far from over..."
  yield text('The story with [kate] is, however, far from over...');

  // if quest.kate_over_isabelle.in_progress:
  const sidedWithKate = yield get(
    (state) => false
  ); /* TODO: Replace with actual condition once "Stepping on the Rose" has been coded in */

  if (sidedWithKate) {
    // "[isabelle] has no idea what's coming. It feels a little bad, but such is life."
    yield text(
      "[isabelle] has no idea what's coming. It feels a little bad, but such is life."
    );

    // "The first part of [kate]'s request was finding out [isabelle]'s focus classes. With that out of the way, the next thing is her favorite drink."
    yield text(
      "The first part of [kate]'s request was finding out [isabelle]'s focus classes. With that out of the way, the next thing is her favorite drink."
    );

    // mc "Hey, would you like me to show you the cafeteria as well?"
    yield text(
      'Hey, would you like me to show you the cafeteria as well?',
      'mc'
    );

    // isabelle confident "Oh, sure! If you have time..."
    yield show('isabelle', 'confident');
    yield text('Oh, sure! If you have time...', 'isabelle');

    // mc "Yeah, no worries. The food isn't amazing, but the strawberry juice is the best!"
    yield text(
      "Yeah, no worries. The food isn't amazing, but the strawberry juice is the best!",
      'mc'
    );

    // isabelle confident "Cool, let's meet up there."
    yield text("Cool, let's meet up there.", 'isabelle');

    // $quest.kate_over_isabelle.advance("spy_drink")
    /* TODO: Uncomment lines below once "Stepping on the Rose" has been coded in
          yield qset({
            quest: 'kate_over_isabelle',
            phase: 'spy_drink',
          }); */
  }

  // elif quest.isabelle_over_kate.in_progress:
  const sidedWithIsabelle = yield get(
    (state) => true
  ); /* TODO: Replace with actual condition once "Dethroning the Queen" has been coded in */

  if (sidedWithIsabelle) {
    // "[isabelle] has no idea what's coming. I need to make sure she's safe."
    yield text(
      "[isabelle] has no idea what's coming. I need to make sure she's safe."
    );

    // mc "Have you thought about the [kate] problem?"
    yield text('Have you thought about the [kate] problem?', 'mc');

    // isabelle eyeroll "Yeah, we need to do something about her..."
    yield show('isabelle', 'eyeroll');
    yield text('Yeah, we need to do something about her...', 'isabelle');

    // isabelle eyeroll "Meet me in the cafeteria and we'll come up with a plan."
    yield text(
      "Meet me in the cafeteria and we'll come up with a plan.",
      'isabelle'
    );

    // mc "Sounds good."
    yield text('Sounds good.', 'mc');

    // $quest.isabelle_over_kate.advance("meeting")
    /* TODO: Uncomment lines below once "Dethroning the Queen" has been coded in
      yield qset({
        quest: 'isabelle_over_kate',
        phase: 'meeting',
      }); */
  }

  // isabelle flirty "By the way, have you—"
  yield show('isabelle', 'flirty');
  yield text('By the way, have you—', 'isabelle');

  // isabelle afraid "Look out!"
  yield show('isabelle', 'afraid');
  yield text('Look out!', 'isabelle');

  // $quest.isabelle_tour.advance("crash")
  /* TODO: Uncomment lines below once "Tour de School" has been coded in
  yield qset({
    quest: 'isabelle_tour',
    phase: 'crash',
  }); */

  // window hide
  yield clearText();

  // play sound "falling_thud"
  /* TODO: Add sound effect once able to */

  // show lindsey lindseypose01
  // show black onlayer screens zorder 100
  // with hpunch
  yield show('lindsey', 'gym_fall', {
    at: 0.078,
  });
  /* TODO: Show black background once able to */
  /* TODO: Add hpunch effect once able to */

  // pause 1.0
  yield pause(1000);

  // hide isabelle
  // hide black onlayer screens
  // with Dissolve(.5)
  yield hide('isabelle', {
    with: {
      dissolve: 0.5,
    },
  });
  /* TODO: Hide black background once able to */

  //  lindsey lindseypose01 "Oww..."
  yield text('Oww...', 'lindsey');

  //  "Damn, that took the wind out of me! [lindsey]'s always been fast, but luckily for me, she's tiny."
  yield text(
    "Damn, that took the wind out of me! [lindsey]'s always been fast, but luckily for me, she's tiny."
  );

  //  "That's the second time she's crashed today. She never seemed like the clumsy kind... maybe her eye-sight is getting bad?"
  yield text(
    "That's the second time she's crashed today. She never seemed like the clumsy kind... maybe her eye-sight is getting bad?"
  );

  //  "In any case, mine isn't, and that's a relief — else I wouldn't be able to feast my eyes on her."
  yield text(
    "In any case, mine isn't, and that's a relief — else I wouldn't be able to feast my eyes on her."
  );

  //  "It does feel a little bad, but everyone else is staring too. Who can blame us when she spreads her legs like that?"
  yield text(
    'It does feel a little bad, but everyone else is staring too. Who can blame us when she spreads her legs like that?'
  );

  //  "It's like her dazed state has shattered her inhibitions. Her body is calling out for someone to... just give it to her."
  yield text(
    "It's like her dazed state has shattered her inhibitions. Her body is calling out for someone to... just give it to her."
  );

  //  "Like she's longing to wrap her legs around your waist as you slam into her. Maybe she has a thing for slamming into stuff?"
  yield text(
    "Like she's longing to wrap her legs around your waist as you slam into her. Maybe she has a thing for slamming into stuff?"
  );

  //  "Maybe she likes it rough and saw the opportunity to get physical with me?"
  yield text(
    'Maybe she likes it rough and saw the opportunity to get physical with me?'
  );

  //  "Oh, who am I kidding? That's just me projecting my fantasies — push her down, grab her by the throat, thrust into her repeatedly until her eyes roll back."
  yield text(
    "Oh, who am I kidding? That's just me projecting my fantasies — push her down, grab her by the throat, thrust into her repeatedly until her eyes roll back."
  );

  //  "Might be a trick of the light, but isn't there a wet spot... just in the right spot?"
  yield text(
    "Might be a trick of the light, but isn't there a wet spot... just in the right spot?"
  );

  //  "The contour of her labia against her panties... oh, man... "
  yield text('The contour of her labia against her panties... oh, man...');

  // $unlock_replay("lindsey_collision")
  /* TODO: Add replay to the phone gallery once able to */

  // $quest.lindsey_nurse.start()
  yield start('loser_to_the_rescue');
  yield qset({
    quest: 'loser_to_the_rescue',
    phase: 'fetch',
  });

  // lindsey lindseypose01 "Who put a wall there...?"
  yield text('Who put a wall there...?', 'lindsey');

  // show isabelle thinking at right with Dissolve(.5)
  yield show('isabelle', 'thinking', {
    /* TODO: Figure out how to show Isabelle above Lindsey */
    at: 0.75,
    with: {
      dissolve: 0.5,
    },
  });

  // isabelle thinking "Hey, are you okay?"
  yield text('Hey, are you okay?', 'isabelle');

  // lindsey lindseypose01 "M-my head..."
  yield text('M-my head...', 'lindsey');

  // isabelle afraid "[mc], she looks really hurt!"
  yield show('isabelle', 'afraid');
  yield text('[mc], she looks really hurt!', 'isabelle');

  // menu(side="far_left"):
  const reallyHurt = yield choices('left', [
    // "\"Wait here, I'll go get the [nurse]!\"":
    { id: 'wait', label: '"Wait here, I\'ll go get the [nurse]!"' },
    // "\"Help me get her to the [nurse]'s office!\"":
    { id: 'help', label: '"Help me get her to the [nurse]\'s office!"' },
    // "\"She should've paid more attention.\"":
    {
      id: 'attention',
      label: '"She should\'ve paid more attention."',
    },
    // "?mc.strength>=3@[mc.strength]/3|{image=stats str}|Carry [lindsey]":
    {
      id: 'carry',
      label: 'Carry [lindsey]',
      icon: 'assets/characters/stats/str.webp',
      iconValue: (state) =>
        `${Math.min(state.character.mc.strength ?? 0, 3)}/3`,
      condition: (state) => state.character.mc.strength >= 3,
    },
  ]);

  switch (reallyHurt) {
    case 'wait':
      // mc "Wait here, I'll go get the [nurse]!"
      yield text("Wait here, I'll go get the [nurse]!", 'mc');

      // $isabelle.love+=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love + 1,
      }));

      // isabelle afraid "Okay, but hurry!"
      yield text('Okay, but hurry!', 'isabelle');

      // hide lindsey
      // hide isabelle
      // with Dissolve(.5)
      yield hide('lindsey', {
        with: {
          dissolve: 0.5,
        },
      });
      yield hide('isabelle', {
        with: {
          dissolve: 0.5,
        },
      });

      // $school_nurse_room["curtain_off"] = False
      yield set({
        scene: 'school_nurse_room',
        curtain: 'closed',
      });
      break;
    case 'help':
      // mc "Help me get her to the [nurse]'s office!"
      yield text("Help me get her to the [nurse]'s office!", 'mc');

      // "[lindsey] probably never cared about my existence until it hit her in the face... but this is what second chances are about."
      yield text(
        '[lindsey] probably never cared about my existence until it hit her in the face... but this is what second chances are about.'
      );

      // isabelle concerned_left "Hey, what's your name?"
      yield equip('isabelle', 'looking_left');
      yield show('isabelle', 'concerned');
      yield text("Hey, what's your name?", 'isabelle');

      // lindsey lindseypose01 "[lindsey]..."
      yield text('[lindsey]...', 'lindsey');

      // isabelle concerned_left "Okay, [lindsey], do you think you can stand if we help you?"
      yield text(
        'Okay, [lindsey], do you think you can stand if we help you?',
        'isabelle'
      );

      // lindsey lindseypose01 "M-maybe..."
      yield text('M-maybe...', 'lindsey');

      // isabelle neutral "Okay, put one arm around each of our necks. We'll take you to the [nurse]."
      yield unequip('isabelle', 'looking_left');
      yield show('isabelle', 'neutral');
      yield text(
        "Okay, put one arm around each of our necks. We'll take you to the [nurse].",
        'isabelle'
      );

      // window hide
      yield clearText();

      // show black onlayer screens zorder 100
      /* TODO: Show black background once able to */

      // pause 1.0
      yield pause(1000);

      // hide lindsey
      // hide isabelle
      // hide black onlayer screens
      // with Dissolve(.5)
      yield hide('lindsey', {
        with: {
          dissolve: 0.5,
        },
      });
      yield hide('isabelle', {
        with: {
          dissolve: 0.5,
        },
      });
      /* TODO: Hide black background once able to */

      // $quest.lindsey_nurse.advance("carry_to_nurse")
      yield qset({
        quest: 'loser_to_the_rescue',
        phase: 'carry',
      });
      break;
    case 'attention':
      // mc "She should've paid more attention."
      yield text("She should've paid more attention.", 'mc');

      // $isabelle.love-=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love - 1,
      }));

      // isabelle angry "What's wrong with you?!"
      yield show('isabelle', 'angry');
      yield text("What's wrong with you?!", 'isabelle');

      // mc "Why should I care about someone who has never given two shits about me?"
      yield text(
        'Why should I care about someone who has never given two shits about me?',
        'mc'
      );

      // isabelle annoyed_left "Because she's hurt! Don't you have any compassion?"
      yield equip('isabelle', 'looking_left');
      yield show('isabelle', 'annoyed');
      yield text(
        "Because she's hurt! Don't you have any compassion?",
        'isabelle'
      );

      // mc "She would probably have laughed if I ran into a beefy football player..."
      yield text(
        'She would probably have laughed if I ran into a beefy football player...',
        'mc'
      );

      // isabelle angry "Here's your chance to set things right, then! Be the bigger person!"
      yield unequip('isabelle', 'looking_left');
      yield show('isabelle', 'angry');
      yield text(
        "Here's your chance to set things right, then! Be the bigger person!",
        'isabelle'
      );

      // menu(side="far_left"):
      const biggerPerson = yield choices('left', [
        // "Help":
        { id: 'help', label: 'Help' },
        // "Pass":
        { id: 'pass', label: 'Pass' },
      ]);

      switch (biggerPerson) {
        case 'help':
          // mc "Fine... okay. Help me get her up."
          yield text('Fine... okay. Help me get her up.', 'mc');

          // isabelle sad "Thank god."
          yield show('isabelle', 'sad');
          yield text('Thank god.', 'isabelle');

          // window hide
          yield clearText();

          // show black onlayer screens zorder 100
          /* TODO: Show black background once able to */

          // pause 1.0
          yield pause(1000);

          // hide lindsey
          // hide isabelle
          // hide black onlayer screens
          // with Dissolve(.5)
          yield hide('lindsey', {
            with: {
              dissolve: 0.5,
            },
          });
          yield hide('isabelle', {
            with: {
              dissolve: 0.5,
            },
          });
          /* TODO: Hide black background once able to */

          // $quest.lindsey_nurse.advance("carry_to_nurse")
          yield qset({
            quest: 'loser_to_the_rescue',
            phase: 'carry',
          });
          break;
        case 'pass':
          // mc "Nope, not my problem."
          yield text('Nope, not my problem.', 'mc');

          // $isabelle.love-=1
          yield cset(({ isabelle }) => ({
            character: 'isabelle',
            love: isabelle.love - 1,
          }));

          // $isabelle.lust-=1
          yield cset(({ isabelle }) => ({
            character: 'isabelle',
            lust: isabelle.lust - 1,
          }));

          // $lindsey.love-=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            love: lindsey.love - 1,
          }));

          // isabelle annoyed "How can you be so callous?"
          yield show('isabelle', 'annoyed');
          yield text('How can you be so callous?', 'isabelle');

          // "When no one gives a shit about you, it's not that hard to turn off your emotions..."
          yield text(
            "When no one gives a shit about you, it's not that hard to turn off your emotions..."
          );

          // "[lindsey] never cared about my existence until it hit her in the face."
          yield text(
            '[lindsey] never cared about my existence until it hit her in the face.'
          );

          // lindsey lindseypose01 "Stars... so many stars..."
          yield text('Stars... so many stars...', 'lindsey');

          // isabelle concerned_left "Hey, what's your name?"
          yield equip('isabelle', 'looking_left');
          yield show('isabelle', 'concerned');
          yield text("Hey, what's your name?", 'isabelle');

          // lindsey lindseypose01 "[lindsey]..."
          yield text('[lindsey]...', 'lindsey');

          // isabelle concerned_left "Okay, [lindsey], do you think you can stand up?"
          yield text(
            'Okay, [lindsey], do you think you can stand up?',
            'isabelle'
          );

          // lindsey lindseypose01 "M-maybe..."
          yield text('M-maybe...', 'lindsey');

          // isabelle neutral "Okay, put your arm around my neck. I'll take you to the [nurse]."
          yield unequip('isabelle', 'looking_left');
          yield show('isabelle', 'neutral');
          yield text(
            "Okay, put your arm around my neck. I'll take you to the [nurse].",
            'isabelle'
          );

          // $lindsey["at_none_now"] = True
          yield cset({
            character: 'lindsey',
            at_none_now: true,
          });

          // window hide
          yield clearText();

          // show black onlayer screens zorder 100 with Dissolve(.5)
          /* TODO: Show black background once able to */

          // pause 1.0
          yield pause(1000);

          // hide lindsey
          // hide isabelle
          // hide black onlayer screens
          // with Dissolve(.5)
          yield hide('lindsey', {
            with: {
              dissolve: 0.5,
            },
          });
          yield hide('isabelle', {
            with: {
              dissolve: 0.5,
            },
          });
          /* TODO: Hide black background once able to */

          // $quest.isabelle_tour.advance("cafeteria")
          /* TODO: Uncomment lines below once "Tour de School" has been coded in
          yield qset({
            quest: 'isabelle_tour',
            phase: 'cafeteria',
          }); */

          // $quest.lindsey_nurse.fail()
          yield qset({
            quest: 'loser_to_the_rescue',
            phase: 'failed',
          });
          yield complete('loser_to_the_rescue');

          // $lindsey["romance_disabled"] = True
          yield cset({
            character: 'lindsey',
            romance_disabled: true,
          });

          // $game.notify_modal(None,"Love or Lust","Romance with [lindsey]:\nDisabled.",wait=5.0)
          /* TODO: Notify player once able to */
          break;
      }
      break;
    case 'carry':
      // window hide
      yield clearText();

      // show lindsey LindseyPose02a
      // show black onlayer screens zorder 100
      // with Dissolve(.5)
      yield equip('lindsey', 'face_dazed');
      /* TODO: Figure out the best way to switch between variations of a special scene */
      yield show('lindsey', 'gym_carry', {
        at: 0.078,
      });
      /* TODO: Show black background once able to */

      // pause 1.0
      yield pause(1000);

      // hide isabelle
      // hide black onlayer screens
      // with Dissolve(.5)
      yield hide('isabelle', {
        with: {
          dissolve: 0.5,
        },
      });
      /* TODO: Hide black background once able to */

      // lindsey LindseyPose02a "W-what happened...?"
      yield text('W-what happened...?', 'lindsey');

      // mc "You had an accident. I'm taking you to the [nurse]."
      yield text("You had an accident. I'm taking you to the [nurse].", 'mc');

      // "This is probably the closest I've ever been to a girl, and it's really not what I expected."
      yield text(
        "This is probably the closest I've ever been to a girl, and it's really not what I expected."
      );

      // "I just want to hold her, breathe in the scent of her hair, the flowery shampoo and natural oils."
      yield text(
        'I just want to hold her, breathe in the scent of her hair, the flowery shampoo and natural oils.'
      );

      // "All those dirty thoughts feel wrong now."
      yield text('All those dirty thoughts feel wrong now.');

      // "She's so light in my arms... so soft and fragile... like porcelain."
      yield text(
        "She's so light in my arms... so soft and fragile... like porcelain."
      );

      // "It's a good feeling — a pure and selfless one — to care for someone in need."
      yield text(
        "It's a good feeling — a pure and selfless one — to care for someone in need."
      );

      // "She's trusting me with her vulnerability — that's the best part."
      yield text(
        "She's trusting me with her vulnerability — that's the best part."
      );

      // $lindsey.love+=1
      yield cset(({ lindsey }) => ({
        character: 'lindsey',
        love: lindsey.love + 1,
      }));

      // $lindsey.lust+=1
      yield cset(({ lindsey }) => ({
        character: 'lindsey',
        lust: lindsey.lust + 1,
      }));

      // "Makes me want to kiss her on the forehead and comfort her. Be a gentleman and a hero!"
      yield text(
        'Makes me want to kiss her on the forehead and comfort her. Be a gentleman and a hero!'
      );

      // "Perhaps, that's what this feeling is — a taste of heroism."
      yield text("Perhaps, that's what this feeling is — a taste of heroism.");

      // lindsey LindseyPose02b "Everything's spinning..."
      yield unequip('lindsey', 'face_dazed');
      yield equip('lindsey', 'face_concerned');
      /* TODO: Figure out the best way to switch between variations of a special scene */
      yield text("Everything's spinning...", 'lindsey');

      // menu(side="right"):
      const everythingSpinning = yield choices('right', [
        // "\"Don't worry, I've got you.\"":
        { id: 'got_you', label: '"Don\'t worry, I\'ve got you."' },
        // "\"Never seen anyone run so fast!\"":
        { id: 'so_fast', label: '"Never seen anyone run so fast!"' },
      ]);

      switch (everythingSpinning) {
        case 'got_you':
          // mc "Don't worry, I've got you."
          yield text("Don't worry, I've got you.", 'mc');

          // $lindsey.lust+=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            lust: lindsey.lust + 1,
          }));

          // lindsey LindseyPose02a "T-thank you... I think I hit my head..."
          yield unequip('lindsey', 'face_concerned');
          yield equip('lindsey', 'face_dazed');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('T-thank you... I think I hit my head...', 'lindsey');

          // mc "You did."
          yield text('You did.', 'mc');

          // mc "Smacked right into my chest!"
          yield text('Smacked right into my chest!', 'mc');

          // lindsey LindseyPose02b "Oh... did I... did I hurt you?"
          yield unequip('lindsey', 'face_dazed');
          yield equip('lindsey', 'face_concerned');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('Oh... did I... did I hurt you?', 'lindsey');

          // mc "Nah, you're good. Sorry I couldn't soften the blow."
          yield text(
            "Nah, you're good. Sorry I couldn't soften the blow.",
            'mc'
          );

          // lindsey LindseyPose02a "It's good that you're strong enough to carry me..."
          yield unequip('lindsey', 'face_concerned');
          yield equip('lindsey', 'face_dazed');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text(
            "It's good that you're strong enough to carry me...",
            'lindsey'
          );

          // lindsey LindseyPose02a "I don't think I could walk right now..."
          yield text("I don't think I could walk right now...", 'lindsey');

          // mc "No worries! I'll carry you right back to the gym as soon as the [nurse] clears you!"
          yield text(
            "No worries! I'll carry you right back to the gym as soon as the [nurse] clears you!",
            'mc'
          );

          // lindsey LindseyPose02c "I bet you would..."
          yield unequip('lindsey', 'face_dazed');
          yield equip('lindsey', 'face_teasing');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('I bet you would...', 'lindsey');

          // pause 1.0
          yield clearText();
          yield pause(1000);

          yield unequip('lindsey', 'face_teasing');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          break;
        case 'so_fast':
          // mc "Never seen anyone run so fast!"
          yield text('Never seen anyone run so fast!', 'mc');

          // $lindsey.love+=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            love: lindsey.love + 1,
          }));

          // lindsey LindseyPose02a "Chivalry and flattery...? What's next...?"
          yield unequip('lindsey', 'face_concerned');
          yield equip('lindsey', 'face_dazed');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text("Chivalry and flattery...? What's next...?", 'lindsey');

          // mc "Hopefully, the [nurse] saying that it's a mild concussion and you'll be okay in a couple of days."
          yield text(
            "Hopefully, the [nurse] saying that it's a mild concussion and you'll be okay in a couple of days.",
            'mc'
          );

          // mc "You have a sprinting competition to win this year!"
          yield text(
            'You have a sprinting competition to win this year!',
            'mc'
          );

          // lindsey LindseyPose02a "T-thanks for taking me there... that's so nice of you..."
          yield text(
            "T-thanks for taking me there... that's so nice of you...",
            'lindsey'
          );

          // "I've never seen a girl look at me like this before..."
          yield text("I've never seen a girl look at me like this before...");

          // "Who knew admiration would feel so fulfilling?"
          yield text('Who knew admiration would feel so fulfilling?');

          // "[lindsey] must've hit her head really hard."
          yield text("[lindsey] must've hit her head really hard.");

          // pause 1.0
          yield clearText();
          yield pause(1000);

          yield unequip('lindsey', 'face_dazed');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          break;
      }

      // show lindsey LindseyPose02nobg with Dissolve(.5)
      yield equip('lindsey', 'face_concerned');
      /* TODO: Figure out the best way to switch between variations of a special scene */

      // call goto_school_first_hall_east
      yield goto({ scene: 'school_first_hall_east', sceneTitle: 'East Hall' });

      // pause 2.0
      yield pause(2000);

      // call goto_school_first_hall
      yield goto({ scene: 'school_first_hall', sceneTitle: 'First Hall' });

      // pause 2.0
      yield pause(2000);

      // call goto_school_ground_floor
      yield goto({ scene: 'school_ground_floor', sceneTitle: 'Ground Floor' });

      // pause 2.0
      yield pause(2000);

      // call goto_school_ground_floor_west
      yield goto({ scene: 'school_ground_floor_west', sceneTitle: 'West Floor' });

      // pause 2.0
      yield pause(2000);

      // show black onlayer screens with Dissolve(.5)
      /* TODO: Show black background once able to */

      // pause 1.0
      /* yield pause(1000); */

      // hide lindsey
      // hide black onlayer screens
      // with Dissolve(.5)
      yield hide('lindsey', {
        with: {
          dissolve: 0.5,
        },
      });
      /* TODO: Hide black background once able to */

      // $quest.lindsey_nurse.advance("carry_to_nurse")
      yield qset({
        quest: 'loser_to_the_rescue',
        phase: 'carry',
      });
      break;
  }

  const carriedLindsey = yield get(
    /* TODO: Figure out how to properly call labels */
    (state) => state.quest.loser_to_the_rescue.phase === 'carry'
  );

  if (carriedLindsey) {
    // $quest.lindsey_nurse["carried"] = True
    yield qset({
      quest: 'loser_to_the_rescue',
      carried_lindsey: true,
    });

    // jump goto_school_nurse_room
    yield goto({ scene: 'school_nurse_room', sceneTitle: 'Nurse Room' });

    // pause 1.0
    yield pause(1000);

    // show nurse concerned at Position(xalign=.25)
    // show isabelle sad at Position(xalign=.75)
    // show lindsey skeptical at Position(xalign=.95)
    // with Dissolve(.5)
    yield show('nurse', 'concerned', {
      at: 0.2,
      with: {
        dissolve: 0.5,
      },
    });
    yield show('isabelle', 'sad', {
      at: 0.5,
      with: {
        dissolve: 0.5,
      },
    });
    yield show('lindsey', 'skeptical', {
      at: 0.65,
      with: {
        dissolve: 0.5,
      },
    });

    // nurse concerned "My, oh my! Please, put her on the bed..."
    yield text('My, oh my! Please, put her on the bed...', 'nurse');

    // pause 0.5
    yield clearText();
    yield pause(500);

    // $lindsey.unequip("lindsey_shirt")
    yield unequip('lindsey', 'face_concerned');
    yield unequip('lindsey', 'jacket');
    /* TODO: Figure out the best way to switch between variations of a special scene */

    // pause 1.0
    yield pause(1000);

    // const curtainClosed = useAppSelector(
    //   (state) => state.scene.home_bedroom.controller === 'taken'
    // );

    const curtainClosed = yield get(
      (state) => state.scene.school_nurse_room.curtain === 'closed'
    );

    if (curtainClosed) {
      // $school_nurse_room["curtain_off"] = True
      yield set({
        scene: 'school_nurse_room',
        curtain: 'open',
      });

      // pause 1.0
      yield pause(1000);
    }

    // show lindsey clinic_nurse_angry_lindsey_neutral
    // show black onlayer screens zorder 100
    // with Dissolve(.5)
    yield equip('nurse', 'face_angry');
    yield equip('lindsey', 'face_neutral');
    /* TODO: Figure out the best way to switch between variations of a special scene */
    yield show('lindsey', 'clinic', {
      at: 0.078,
      with: {
        dissolve: 0.5,
      },
    });
    /* TODO: Show black background once able to */

    // pause 1.0
    yield pause(1000);

    // hide nurse
    // hide isabelle
    // hide black onlayer screens
    // with Dissolve(.5)
    yield hide('nurse', {
      with: {
        dissolve: 0.5,
      },
    });
    yield hide('isabelle', {
      with: {
        dissolve: 0.5,
      },
    });
    /* TODO: Hide black background once able to */

    // nurse clinic_nurse_angry "How are you feeling, [lindsey]?"
    yield text('How are you feeling, [lindsey]?', 'nurse');

    // lindsey clinic_lindsey_annoyed "D-dizzy... my head hurts..."
    yield unequip('lindsey', 'face_neutral');
    yield equip('lindsey', 'face_annoyed');
    /* TODO: Figure out the best way to switch between variations of a special scene */
    yield text('D-dizzy... my head hurts...', 'lindsey');

    // nurse clinic_nurse_angry "How did this happen?"
    yield text('How did this happen?', 'nurse');

    // menu(side="far_right"):
    const whatHappened = yield choices('right', [
      // "\"She tried to mow me down, but didn't realize I'm made of steel.\"":
      {
        id: 'steel',
        label:
          '"She tried to mow me down, but didn\'t realize I\'m made of steel."',
      },
      // "\"Frontal collision at about eighty miles an hour.\"":
      {
        id: 'collision',
        label: '"Frontal collision at about eighty miles an hour."',
      },
      // "\"She was doing laps in the gym and accidentally ran into me. She hit her head quite hard.\"":
      {
        id: 'laps',
        label:
          '"She was doing laps in the gym and accidentally ran into me. She hit her head quite hard."',
      },
    ]);

    switch (whatHappened) {
      case 'steel':
        // $mc.strength+=1
        yield cset(({ mc }) => ({
          character: 'mc',
          strength: mc.strength + 1,
        }));

        // mc "She tried to mow me down, but didn't realize I'm made of steel."
        yield text(
          "She tried to mow me down, but didn't realize I'm made of steel.",
          'mc'
        );

        // $lindsey.lust+=1
        yield cset(({ lindsey }) => ({
          character: 'lindsey',
          lust: lindsey.lust + 1,
        }));

        // lindsey clinic_lindsey_laughing "Not true! I just didn't see you!"
        yield unequip('lindsey', 'face_annoyed');
        yield equip('lindsey', 'face_laughing');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text("Not true! I just didn't see you!", 'lindsey');

        // $nurse.love-=1
        yield cset(({ nurse }) => ({
          character: 'nurse',
          love: nurse.love - 1,
        }));

        // nurse clinic_nurse_confused "I get the feeling this wasn't a car accident..."
        yield unequip('nurse', 'face_angry');
        yield equip('nurse', 'face_confused');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text("I get the feeling this wasn't a car accident...", 'nurse');

        // mc "No, but the result would probably have been the same."
        yield text(
          'No, but the result would probably have been the same.',
          'mc'
        );

        // $isabelle.lust-=1
        yield cset(({ isabelle }) => ({
          character: 'isabelle',
          lust: isabelle.lust - 1,
        }));

        // show isabelle eyeroll at appear_from_right("right")
        yield show('isabelle', 'eyeroll', {
          at: 0.75,
          with: {
            appearFrom: 'right',
          },
        });

        // isabelle "Right. Since you're all muscle, there aren't any brain cells to lose."
        yield text(
          "Right. Since you're all muscle, there aren't any brain cells to lose.",
          'isabelle'
        );

        // lindsey clinic_lindsey_angry "Nothing wrong with staying fit!"
        yield unequip('lindsey', 'face_laughing');
        yield equip('lindsey', 'face_angry');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text('Nothing wrong with staying fit!', 'lindsey');

        // show isabelle eyeroll at disappear_to_right
        yield hide('isabelle', {
          with: {
            disappearTo: 'right',
          },
        });
        break;
      case 'collision':
        // $mc.charisma+=1
        yield cset(({ mc }) => ({
          character: 'mc',
          charisma: mc.charisma + 1,
        }));

        // mc "Frontal collision at about eighty miles an hour."
        yield text('Frontal collision at about eighty miles an hour.', 'mc');

        // $nurse.love-=1
        yield cset(({ nurse }) => ({
          character: 'nurse',
          love: nurse.love - 1,
        }));

        // nurse clinic_nurse_confused "I get the feeling this wasn't a car accident..."
        yield unequip('nurse', 'face_angry');
        yield equip('nurse', 'face_confused');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text("I get the feeling this wasn't a car accident...", 'nurse');

        // mc "No, but she was going way over the speed limit."
        yield text('No, but she was going way over the speed limit.', 'mc');

        // $lindsey.love+=1
        yield cset(({ lindsey }) => ({
          character: 'lindsey',
          love: lindsey.love + 1,
        }));

        // lindsey clinic_lindsey_blush "Awww! I never knew you were so charming before!"
        yield unequip('lindsey', 'face_annoyed');
        yield equip('lindsey', 'face_blush');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text(
          'Awww! I never knew you were so charming before!',
          'lindsey'
        );

        // lindsey clinic_lindsey_blush "In fact, we've never really talked much at all..."
        yield text(
          "In fact, we've never really talked much at all...",
          'lindsey'
        );
        break;
      case 'laps':
        // mc "She was doing laps in the gym and accidentally ran into me. She hit her head quite hard."
        yield text(
          'She was doing laps in the gym and accidentally ran into me. She hit her head quite hard.',
          'mc'
        );

        // nurse clinic_nurse_confused "Accidents happen. Good job bringing her here so fast."
        yield unequip('nurse', 'face_angry');
        yield equip('nurse', 'face_confused');
        /* TODO: Figure out the best way to switch between variations of a special scene */
        yield text(
          'Accidents happen. Good job bringing her here so fast.',
          'nurse'
        );

        // menu(side="far_right"):
        const goodJob = yield choices('right', [
          // "\"It's my duty to keep the people safe!\"":
          {
            id: 'duty',
            label: '"It\'s my duty to keep the people safe!"',
          },
          // "\"It was my fault, and she looked like she needed my help getting here.\"":
          {
            id: 'fault',
            label:
              '"It was my fault, and she looked like she needed my help getting here."',
          },
          // "Let [isabelle] explain":
          {
            id: 'isabelle',
            label: 'Let [isabelle] explain',
          },
        ]);

        switch (goodJob) {
          case 'duty':
            // mc "It's my duty to keep the people safe!"
            yield text("It's my duty to keep the people safe!", 'mc');

            // $isabelle.lust+=1
            yield cset(({ isabelle }) => ({
              character: 'isabelle',
              lust: isabelle.lust + 1,
            }));

            // show isabelle blush at appear_from_right("right")
            yield show('isabelle', 'blush', {
              at: 0.75,
              with: {
                appearFrom: 'right',
              },
            });

            // isabelle blush "That's an admirable sentiment."
            yield text("That's an admirable sentiment.", 'isabelle');

            // show isabelle blush at disappear_to_right
            yield hide('isabelle', {
              with: {
                disappearTo: 'right',
              },
            });
            break;
          case 'fault':
            // mc "It was my fault, and she looked like she needed my help getting here."
            yield text(
              'It was my fault, and she looked like she needed my help getting here.',
              'mc'
            );

            // lindsey clinic_lindsey_smile "It was both our faults!"
            yield unequip('lindsey', 'face_annoyed');
            yield equip('lindsey', 'face_smile');
            /* TODO: Figure out the best way to switch between variations of a special scene */
            yield text('It was both our faults!', 'lindsey');

            // $lindsey.lust+=1
            yield cset(({ lindsey }) => ({
              character: 'lindsey',
              lust: lindsey.lust + 1,
            }));

            // lindsey clinic_lindsey_blush "But, yes, I could hardly walk... thank you."
            yield unequip('lindsey', 'face_smile');
            yield equip('lindsey', 'face_blush');
            /* TODO: Figure out the best way to switch between variations of a special scene */
            yield text(
              'But, yes, I could hardly walk... thank you.',
              'lindsey'
            );
            break;
          case 'isabelle':
            // $lindsey.lust-=1
            yield cset(({ lindsey }) => ({
              character: 'lindsey',
              lust: lindsey.lust - 1,
            }));

            // show isabelle sad at appear_from_right("right")
            yield show('isabelle', 'sad', {
              at: 0.75,
              with: {
                appearFrom: 'right',
              },
            });

            // isabelle sad "They ran into each other. [lindsey] got the worst of it."
            yield text(
              'They ran into each other. [lindsey] got the worst of it.',
              'isabelle'
            );

            // nurse clinic_nurse_confused "Very well. Good that you got her here so fast..."
            yield text(
              'Very well. Good that you got her here so fast...',
              'nurse'
            );

            // $isabelle.love+=1
            yield cset(({ isabelle }) => ({
              character: 'isabelle',
              love: isabelle.love + 1,
            }));

            // isabelle blush "That's the least we could do! [mc] seemed more than happy to help out."
            yield show('isabelle', 'blush');
            yield text(
              "That's the least we could do! [mc] seemed more than happy to help out.",
              'isabelle'
            );

            // nurse clinic_nurse_confused "[lindsey] is lucky to have such considerate classmates."
            yield text(
              '[lindsey] is lucky to have such considerate classmates.',
              'nurse'
            );

            // nurse clinic_nurse_confused "I'm sure she's thankful even though she's a bit out of it right now..."
            yield text(
              "I'm sure she's thankful even though she's a bit out of it right now...",
              'nurse'
            );

            // show isabelle blush at disappear_to_right
            yield hide('isabelle', {
              with: {
                disappearTo: 'right',
              },
            });
            break;
        }
        break;
    }

    // nurse clinic_nurse_confused "Okay, [lindsey], I'm going to check you for a concussion. Does anywhere else hurt?"
    yield text(
      "Okay, [lindsey], I'm going to check you for a concussion. Does anywhere else hurt?",
      'nurse'
    );

    // lindsey clinic_lindsey_smile "My head and my chest..."
    yield unequip('lindsey', 'face_angry');
    yield unequip('lindsey', 'face_annoyed');
    yield unequip('lindsey', 'face_blush');
    yield equip('lindsey', 'face_smile');
    /* TODO: Figure out the best way to switch between variations of a special scene */
    yield text('My head and my chest...', 'lindsey');

    // nurse clinic_nurse_confused "All right, you guys can wait outside. Thanks for your help!"
    yield text(
      'All right, you guys can wait outside. Thanks for your help!',
      'nurse'
    );

    // show isabelle neutral at appear_from_right("right")
    yield show('isabelle', 'neutral', {
      at: 0.75,
      with: {
        appearFrom: 'right',
      },
    });

    // isabelle neutral "No problem! [mc], meet me at the cafeteria."
    yield text('No problem! [mc], meet me at the cafeteria.', 'isabelle');

    // window hide
    yield clearText();

    // show black onlayer screens zorder 100 with Dissolve(.5)
    /* TODO: Show black background once able to */

    // pause 1.0
    yield pause(1000);

    // $lindsey["at_none_now"] = True
    yield cset({
      character: 'lindsey',
      at_none_now: true,
    });

    // $school_nurse_room["curtain_off"] = False
    yield set({
      scene: 'school_nurse_room',
      curtain: 'closed',
    });

    // hide lindsey
    // hide isabelle
    // hide black onlayer screens
    // with Dissolve(.5)
    yield hide('lindsey', {
      with: {
        dissolve: 0.5,
      },
    });
    yield hide('isabelle', {
      with: {
        dissolve: 0.5,
      },
    });
    /* TODO: Hide black background once able to */

    // $quest.lindsey_nurse.advance("nurse_room")
    yield qset({
      quest: 'loser_to_the_rescue',
      phase: 'peek',
    });

    // $quest.isabelle_tour.advance("cafeteria")
    /* TODO: Uncomment lines below once "Tour de School" has been coded in
    yield qset({
      quest: 'isabelle_tour',
      phase: 'cafeteria',
    }); */

    yield unequip('nurse', 'face_confused');
    yield unequip('lindsey', 'face_smile');
    /* TODO: Figure out the best way to switch between variations of a special scene */
  }
};
