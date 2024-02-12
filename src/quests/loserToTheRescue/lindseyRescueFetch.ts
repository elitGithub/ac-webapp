// Actions
import {
  text,
  choices,
  set,
  unequip,
  equip,
  show,
  cset,
  moveTo,
  addItem,
  clearText,
  hide,
  pause,
  qset,
  get,
  goto,
  complete,
} from 'state/actions';

// Libraries
import { hasItem } from 'state/features/character';

// Types
import type { Sequence } from 'components/SequenceContext';

export const lindseyRescueFetch = function* (): Sequence {
  // nurse "Mr. Brown!"
  yield text('Mr. Brown!', 'nurse');

  // nurse "That's not how you use a medical massager!"
  yield text("That's not how you use a medical massager!", 'nurse');

  // nurse "Oh! Oh, my... {i}Mr. Brown!{/i}"
  yield text('Oh! Oh, my... *Mr. Brown!*', 'nurse');

  // nurse "You can't let anyone know! My reputation! My job!"
  yield text("You can't let anyone know! My reputation! My job!", 'nurse');

  // menu(side="middle"):
  const behindCurtain = yield choices('middle', [
    // "Pull back the curtain":
    { id: 'pull', label: 'Pull back the curtain' },
    // "Make your presence known":
    { id: 'presence', label: 'Make your presence known' },
  ]);

  switch (behindCurtain) {
    case 'pull':
      // $unlock_replay("nurse_compromise")
      /* TODO: Add replay to the phone gallery once able to */

      // $unlock_stat_perk("lust12")
      /* TODO: Unlock perk once able to */

      // $school_nurse_room["curtain_off"] = True
      yield set({
        scene: 'school_nurse_room',
        curtain: 'open',
      });

      // $nurse.equip("nurse_masturbating")
      yield unequip('nurse', 'outfit');
      yield equip('nurse', 'masturbating');

      // show nurse surprised with Dissolve(.5)
      yield show('nurse', 'surprised', {
        at: 0.5,
        with: {
          dissolve: 0.5,
        },
      });

      // nurse surprised "[mc]?! What in god's name?!" with vpunch
      yield text("[mc]?! What in god's name?!", 'nurse');
      /* TODO: Add vpunch effect once able to */

      // $mc.lust+=1
      yield cset(({ mc }) => ({
        character: 'mc',
        lust: mc.lust + 1,
      }));

      // "Look at her all embarrassed! The heat of her lust still clinging to her cheeks!"
      yield text(
        'Look at her all embarrassed! The heat of her lust still clinging to her cheeks!'
      );

      // "To catch someone in such a compromising position has always been a fantasy of mine."
      yield text(
        'To catch someone in such a compromising position has always been a fantasy of mine.'
      );

      // "To see the terror and desire in her eyes... her fingers still glistening with her juices..."
      yield text(
        'To see the terror and desire in her eyes... her fingers still glistening with her juices...'
      );

      // "Beads of sweat on her forehead, so close to reaching her climax — but unable now."
      yield text(
        'Beads of sweat on her forehead, so close to reaching her climax — but unable now.'
      );

      // "Denied."
      yield text('Denied.');

      // "And then the repercussions start filling her head. Shame... regret... fear... but also excitement."
      yield text(
        'And then the repercussions start filling her head. Shame... regret... fear... but also excitement.'
      );

      // "It still lingers as her body disagrees with her mind."
      yield text('It still lingers as her body disagrees with her mind.');

      // "Her blush deepens."
      yield text('Her blush deepens.');

      // "How will she get out of this? Will I let her?"
      yield text('How will she get out of this? Will I let her?');

      // "The loss of power... the exposure... we're both feeling it."
      yield text("The loss of power... the exposure... we're both feeling it.");

      // nurse afraid "This is not what it looks like!"
      yield show('nurse', 'afraid');
      yield text('This is not what it looks like!', 'nurse');

      // show nurse afraid at move_to(.25)
      yield moveTo('nurse', 0.25);

      // menu(side="right"):
      const nurseCaught = yield choices('right', [
        // "\"Huh! It looks exactly like you were having a very wet daydream about the English teacher!\"":
        {
          id: 'daydream',
          label:
            '"Huh! It looks exactly like you were having a very wet daydream about the English teacher!"',
        },
        // "\"I'm so sorry! I should've knocked!\"":
        { id: 'sorry', label: '"I\'m so sorry! I should\'ve knocked!"' },
        // "\"Smile for the camera!\"":
        { id: 'camera', label: '"Smile for the camera!"' },
        // "\"Relax... there's no shame in this, and I won't tell anyone.\"":
        {
          id: 'relax',
          label:
            '"Relax... there\'s no shame in this, and I won\'t tell anyone."',
        },
      ]);

      switch (nurseCaught) {
        case 'daydream':
          // show nurse afraid at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "Huh! It looks exactly like you were having a very wet daydream about the English teacher!"
          yield text(
            'Huh! It looks exactly like you were having a very wet daydream about the English teacher!',
            'mc'
          );

          // nurse annoyed "I... I..."
          yield show('nurse', 'annoyed');
          yield text('I... I...', 'nurse');

          // mc "Don't worry, I won't tell anyone."
          yield text("Don't worry, I won't tell anyone.", 'mc');

          // nurse neutral  "Really?"
          yield show('nurse', 'neutral');
          yield text('Really?', 'nurse');

          // mc "Of course not! It'll be our little secret."
          yield text("Of course not! It'll be our little secret.", 'mc');

          // nurse smile "Thank you... I can't lose this job..."
          yield show('nurse', 'smile');
          yield text("Thank you... I can't lose this job...", 'nurse');

          // mc "You're welcome!"
          yield text("You're welcome!", 'mc');

          // show nurse smile at move_to(.75)
          yield moveTo('nurse', 0.75);

          // menu(side="left"):
          const littleSecret = yield choices('left', [
            // "\"Just one for the yearbook, okay?\"":
            { id: 'yearbook', label: '"Just one for the yearbook, okay?"' },
            // "\"It's okay, I know how hard you work.\"":
            { id: 'work', label: '"It\'s okay, I know how hard you work."' },
          ]);

          switch (littleSecret) {
            case 'yearbook':
              // show nurse smile at move_to(.5)
              yield moveTo('nurse', 0.5);

              // mc "Just one for the yearbook, okay?"
              yield text('Just one for the yearbook, okay?', 'mc');

              // show white with Dissolve(.15)
              /* TODO: Show white background once able to */

              // play sound "camera_snap"
              /* TODO: Add sound effect once able to */

              // hide white with Dissolve(.15)
              /* TODO: Hide white background once able to */

              // $mc.add_item("compromising_photo")
              yield addItem('mc', 'compromising_photo');

              // $nurse.love-=1
              yield cset(({ nurse }) => ({
                character: 'nurse',
                love: nurse.love - 1,
              }));

              // $nurse.lust+=1
              yield cset(({ nurse }) => ({
                character: 'nurse',
                lust: nurse.lust + 1,
              }));

              // nurse afraid "W-what?"
              yield show('nurse', 'afraid');
              yield text('W-what?', 'nurse');

              // mc "Your job and reputation mean everything to you, right?"
              yield text(
                'Your job and reputation mean everything to you, right?',
                'mc'
              );

              // nurse surprised "Please, this can't get out!"
              yield show('nurse', 'surprised');
              yield text("Please, this can't get out!", 'nurse');

              // mc "If you play your cards right, nobody will see this."
              yield text(
                'If you play your cards right, nobody will see this.',
                'mc'
              );

              // nurse surprised "This is blackmail!"
              yield text('This is blackmail!', 'nurse');

              // mc "Yes, and I've got nothing to lose. You do."
              yield text("Yes, and I've got nothing to lose. You do.", 'mc');

              // mc "Do you know how easy it is to print up a few of these?"
              yield text(
                'Do you know how easy it is to print up a few of these?',
                'mc'
              );

              // mc "Or just report you to [jo]?"
              yield text('Or just report you to [jo]?', 'mc');

              // nurse afraid "Please! I'll be ruined!"
              yield show('nurse', 'afraid');
              yield text("Please! I'll be ruined!", 'nurse');

              // mc "You'll be all right. Just don't do anything stupid."
              yield text(
                "You'll be all right. Just don't do anything stupid.",
                'mc'
              );

              // nurse annoyed "Like what?"
              yield show('nurse', 'annoyed');
              yield text('Like what?', 'nurse');

              // mc "Like snitching. No snitching!"
              yield text('Like snitching. No snitching!', 'mc');

              // nurse afraid "I won't say anything!"
              yield show('nurse', 'afraid');
              yield text("I won't say anything!", 'nurse');

              // nurse afraid "Just please don't show this to anyone..."
              yield text("Just please don't show this to anyone...", 'nurse');

              // mc "You have my word."
              yield text('You have my word.', 'mc');

              // "This could all come crashing down on me, but I never took risks in the past."
              yield text(
                'This could all come crashing down on me, but I never took risks in the past.'
              );

              // "Here's my chance to get something back from the place that took everything from me..."
              yield text(
                "Here's my chance to get something back from the place that took everything from me..."
              );

              // "I just got to be smart about this."
              yield text('I just got to be smart about this.');
              break;
            case 'work':
              // show nurse smile at move_to(.5)
              yield moveTo('nurse', 0.5);

              // mc "It's okay, I know how hard you work."
              yield text("It's okay, I know how hard you work.", 'mc');

              // $nurse.love+=1
              yield cset(({ nurse }) => ({
                character: 'nurse',
                love: nurse.love + 1,
              }));

              // $nurse.lust-=1
              yield cset(({ nurse }) => ({
                character: 'nurse',
                lust: nurse.lust + 1,
              }));

              // nurse smile "I appreciate that. It won't happen again!"
              yield text("I appreciate that. It won't happen again!", 'nurse');

              // mc "And if it does, just make sure you lock the door first."
              yield text(
                'And if it does, just make sure you lock the door first.',
                'mc'
              );

              // nurse smile "Okay, I promise."
              yield text('Okay, I promise.', 'nurse');

              // "The [nurse] seems relieved, but there's something else in her eyes..."
              yield text(
                "The [nurse] seems relieved, but there's something else in her eyes..."
              );

              // "Disappointment...? Nah, that can't be — must be my imagination."
              yield text(
                "Disappointment...? Nah, that can't be — must be my imagination."
              );
              break;
          }
          break;
        case 'sorry':
          // show nurse afraid at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "I'm so sorry! I should've knocked!"
          yield text("I'm so sorry! I should've knocked!", 'mc');

          // nurse afraid "Oh, my god! This can't be happening..."
          yield text("Oh, my god! This can't be happening...", 'nurse');

          // mc "Hey, it could've been worse! At least you look great."
          yield text(
            "Hey, it could've been worse! At least you look great.",
            'mc'
          );

          // nurse smile "Do you really think so?"
          yield show('nurse', 'smile');
          yield text('Do you really think so?', 'nurse');

          // nurse annoyed "Err, I mean... this is widely inappropriate!"
          yield show('nurse', 'annoyed');
          yield text('Err, I mean... this is widely inappropriate!', 'nurse');

          // mc "Maybe what you were doing. I'm just complimenting you."
          yield text(
            "Maybe what you were doing. I'm just complimenting you.",
            'mc'
          );

          // nurse neutral "This is the most embarrassing moment of my life..."
          yield show('nurse', 'neutral');
          yield text(
            'This is the most embarrassing moment of my life...',
            'nurse'
          );

          // mc "Don't beat yourself up! It's really not a big deal."
          yield text(
            "Don't beat yourself up! It's really not a big deal.",
            'mc'
          );

          // nurse neutral "Don't tell anyone, okay?"
          yield text("Don't tell anyone, okay?", 'nurse');

          // mc "My lips are sealed."
          yield text('My lips are sealed.', 'mc');
          break;
        case 'camera':
          // show nurse afraid at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "Smile for the camera!"
          yield text('Smile for the camera!', 'mc');

          // show white with Dissolve(.15)
          /* TODO: Show white background once able to */

          // play sound "camera_snap"
          /* TODO: Add sound effect once able to */

          // hide white with Dissolve(.15)
          /* TODO: Hide white background once able to */

          // $mc.add_item("compromising_photo")
          yield addItem('mc', 'compromising_photo');

          // $nurse.lust+=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            lust: nurse.lust + 1,
          }));

          // nurse surprised "D-did you just...?"
          yield show('nurse', 'surprised');
          yield text('D-did you just...?', 'nurse');

          // mc "You have a lot to lose, don't you?"
          yield text("You have a lot to lose, don't you?", 'mc');

          // nurse afraid "Oh, my... this... this can't get out!"
          yield show('nurse', 'afraid');
          yield text("Oh, my... this... this can't get out!", 'nurse');

          // mc "If you follow my instructions, it won't."
          yield text("If you follow my instructions, it won't.", 'mc');

          // nurse afraid "Y-you're going to blackmail me?!"
          yield text("Y-you're going to blackmail me?!", 'nurse');

          // mc "We'll see, I guess."
          yield text("We'll see, I guess.", 'mc');

          // mc "Maybe I'll just print up a bunch of these and post them all over the school..."
          yield text(
            "Maybe I'll just print up a bunch of these and post them all over the school...",
            'mc'
          );

          // mc "Maybe I'll give the photo anonymously to the principal..."
          yield text(
            "Maybe I'll give the photo anonymously to the principal...",
            'mc'
          );

          // nurse surprised "Oh, please! Please, you can't! My life will be over!"
          yield show('nurse', 'surprised');
          yield text(
            "Oh, please! Please, you can't! My life will be over!",
            'nurse'
          );

          // mc "Maybe I won't... it all depends on your actions."
          yield text("Maybe I won't... it all depends on your actions.", 'mc');

          // nurse annoyed "What do you mean?"
          yield show('nurse', 'annoyed');
          yield text('What do you mean?', 'nurse');

          // mc "If you're quiet about it, no one will know. But if you decide to tell people..."
          yield text(
            "If you're quiet about it, no one will know. But if you decide to tell people...",
            'mc'
          );

          // nurse afraid "I'll keep quiet! I swear!"
          yield show('nurse', 'afraid');
          yield text("I'll keep quiet! I swear!", 'nurse');

          // nurse afraid "Please, don't ruin me..."
          yield text("Please, don't ruin me...", 'nurse');

          // mc "Okay, that's good. We'll see what happens, then. For now... you're safe."
          yield text(
            "Okay, that's good. We'll see what happens, then. For now... you're safe.",
            'mc'
          );

          // mc "But if you do decide to tell people, just know that my life isn't worth anything, and the only loser in that scenario will be you."
          yield text(
            "But if you do decide to tell people, just know that my life isn't worth anything, and the only loser in that scenario will be you.",
            'mc'
          );

          // nurse afraid "I won't! I promise!"
          yield text("I won't! I promise!", 'nurse');

          // "This could all come crashing down on me, but I never took risks in the past."
          yield text(
            'This could all come crashing down on me, but I never took risks in the past.'
          );

          // "Here's my chance to get something back from the place that took everything from me..."
          yield text(
            "Here's my chance to get something back from the place that took everything from me..."
          );

          // "I just got to be smart about this."
          yield text('I just got to be smart about this.');
          break;
        case 'relax':
          // show nurse afraid at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "Relax... there's no shame in this, and I won't tell anyone."
          yield text(
            "Relax... there's no shame in this, and I won't tell anyone.",
            'mc'
          );

          // nurse neutral "Really?"
          yield show('nurse', 'neutral');
          yield text('Really?', 'nurse');

          // mc "Yes, really."
          yield text('Yes, really.', 'mc');

          // "Getting caught masturbating is a very relatable fear..."
          yield text('Getting caught masturbating is a very relatable fear...');

          // "If it ever happened to me, I'd like it to be by someone kind and understanding."
          yield text(
            "If it ever happened to me, I'd like it to be by someone kind and understanding."
          );

          // mc "Everyone needs to take the edge off. Just lock the door next time."
          yield text(
            'Everyone needs to take the edge off. Just lock the door next time.',
            'mc'
          );

          // $nurse.love+=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            love: nurse.love + 1,
          }));

          // $nurse.lust-=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            lust: nurse.lust - 1,
          }));

          // nurse smile "I'm such an idiot. I'm so sorry you had to see it."
          yield show('nurse', 'smile');
          yield text(
            "I'm such an idiot. I'm so sorry you had to see it.",
            'nurse'
          );

          // nurse smile "I've been so stressed out lately..."
          yield text("I've been so stressed out lately...", 'nurse');

          // mc "Don't worry about it!"
          yield text("Don't worry about it!", 'mc');

          // "The [nurse] seems relieved, but there's something else in her eyes..."
          yield text(
            "The [nurse] seems relieved, but there's something else in her eyes..."
          );

          // "Disappointment...? Nah, that can't be — must be my imagination."
          yield text(
            "Disappointment...? Nah, that can't be — must be my imagination."
          );
          break;
      }
      break;
    case 'presence':
      // $unlock_stat_perk("love12")
      /* TODO: Unlock perk once able to */

      // $mc.love+=1
      yield cset(({ mc }) => ({
        character: 'mc',
        love: mc.love + 1,
      }));

      // mc "...Hello?"
      yield text('...Hello?', 'mc');

      // nurse "..."
      yield text('...', 'nurse');

      // nurse "Just a moment!"
      yield text('Just a moment!', 'nurse');

      // nurse "..."
      yield text('...', 'nurse');

      // $school_nurse_room["curtain_off"] = True
      yield set({
        scene: 'school_nurse_room',
        curtain: 'open',
      });

      // $nurse.unequip("nurse_pantys")
      yield unequip('nurse', 'panties');

      // show nurse blush with Dissolve(.5)
      yield show('nurse', 'blush', {
        at: 0.5,
        with: {
          dissolve: 0.5,
        },
      });

      // nurse "How can I help you?"
      yield text('How can I help you?', 'nurse');

      // show nurse blush at move_to(.25)
      yield moveTo('nurse', 0.25);

      // menu(side="right"):
      const helpYou = yield choices('right', [
        // "\"Where is Mr. Brown?\"":
        {
          id: 'brown',
          label: '"Where is Mr. Brown?"',
        },
        // "\"What were you doing behind there?\"":
        {
          id: 'behind',
          label: '"What were you doing behind there?"',
        },
        // "\"Sorry to intrude, but [lindsey] had an accident in the gym...\"":
        {
          id: 'accident',
          label:
            '"Sorry to intrude, but [lindsey] had an accident in the gym..."',
        },
      ]);

      switch (helpYou) {
        case 'brown':
          // show nurse blush at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "Where is Mr. Brown?"
          yield text('Where is Mr. Brown?', 'mc');

          // nurse afraid "W-who?"
          yield show('nurse', 'afraid');
          yield text('W-who?', 'nurse');

          // mc "The English teacher I thought I heard you say his name?"
          yield text(
            'The English teacher. I thought I heard you say his name?',
            'mc'
          );

          // nurse annoyed "I, err... I think you must've misheard..."
          yield show('nurse', 'annoyed');
          yield text("I, err... I think you must've misheard...", 'nurse');

          // mc "Were you masturbating?"
          yield text('Were you masturbating?', 'mc');

          // nurse surprised "Absolutely not! What an outrageous thing to say!"
          yield show('nurse', 'surprised');
          yield text(
            'Absolutely not! What an outrageous thing to say!',
            'nurse'
          );

          // "Getting caught masturbating is a very relatable fear..."
          yield text('Getting caught masturbating is a very relatable fear...');

          // "If it ever happened to me, I'd like it to be by someone kind and understanding."
          yield text(
            "If it ever happened to me, I'd like it to be by someone kind and understanding."
          );

          // mc "Everyone needs to take the edge off. Just lock the door next time."
          yield text(
            'Everyone needs to take the edge off. Just lock the door next time.',
            'mc'
          );

          // $nurse.love+=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            love: nurse.love + 1,
          }));

          // nurse smile "I... I didn't, but thanks... that's very mature of you..."
          yield show('nurse', 'smile');
          yield text(
            "I... I didn't, but thanks... that's very mature of you...",
            'nurse'
          );

          // mc "Don't worry about it."
          yield text("Don't worry about it.", 'mc');

          // mc "Right, I almost forgot! [lindsey] had an accident in the gym."
          yield text(
            'Right, I almost forgot! [lindsey] had an accident in the gym.',
            'mc'
          );

          // nurse surprised "My goodness! Let's go immediately!"
          yield show('nurse', 'surprised');
          yield text("My goodness! Let's go immediately!", 'nurse');

          // window hide
          yield clearText();

          // show nurse surprised at disappear_to_right
          yield hide('nurse', {
            with: {
              disappearTo: 'right',
            },
          });

          // pause 0.75
          yield pause(750);

          // "Oh? Looks like she forgot to hide the evidence..."
          yield text('Oh? Looks like she forgot to hide the evidence...');

          // "These might come in handy."
          yield text('These might come in handy.');

          // $mc.add_item("nurse_panties")
          yield addItem('mc', 'nurse_panties');
          break;
        case 'behind':
          // show nurse blush at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "What were you doing behind there?"
          yield text('What were you doing behind there?', 'mc');

          // nurse annoyed "N-nothing! Just preparing for the day."
          yield show('nurse', 'annoyed');
          yield text('N-nothing! Just preparing for the day.', 'nurse');

          // mc "Sounded like very in-depth preparation..."
          yield text('Sounded like very in-depth preparation...', 'mc');

          // nurse afraid  "Thanks! I... I like to—"
          yield show('nurse', 'afraid');
          yield text('Thanks! I... I like to—', 'nurse');

          // mc "Oh, it did sound like you were enjoying yourself!"
          yield text('Oh, it did sound like you were enjoying yourself!', 'mc');

          // nurse annoyed "Err... was there anything you wanted?"
          yield show('nurse', 'annoyed');
          yield text('Err... was there anything you wanted?', 'nurse');

          // mc "Yes, actually. [lindsey] had an accident in the gym."
          yield text(
            'Yes, actually. [lindsey] had an accident in the gym.',
            'mc'
          );

          // nurse surprised "My goodness! Let's go immediately!"
          yield show('nurse', 'surprised');
          yield text("My goodness! Let's go immediately!", 'nurse');

          // window hide
          yield clearText();

          // show nurse surprised at disappear_to_right
          yield hide('nurse', {
            with: {
              disappearTo: 'right',
            },
          });

          // pause 0.75
          yield pause(750);

          // "Oh? Looks like she forgot to hide the evidence..."
          yield text('Oh? Looks like she forgot to hide the evidence...');

          // "These might come in handy."
          yield text('These might come in handy.');

          // $mc.add_item("nurse_panties")
          yield addItem('mc', 'nurse_panties');
          break;
        case 'accident':
          // show nurse blush at move_to(.5)
          yield moveTo('nurse', 0.5);

          // mc "Sorry to intrude, but [lindsey] had an accident in the gym..."
          yield text(
            'Sorry to intrude, but [lindsey] had an accident in the gym...',
            'mc'
          );

          // nurse surprised "Oh, no! What happened?"
          yield show('nurse', 'surprised');
          yield text('Oh, no! What happened?', 'nurse');

          // mc "She ran into me. Hit her head quite hard."
          yield text('She ran into me. Hit her head quite hard.', 'mc');

          // nurse neutral "Okay, let's hurry, then!"
          yield show('nurse', 'neutral');
          yield text("Okay, let's hurry, then!", 'nurse');

          // nurse neutral "Gosh, I hope she's okay..."
          yield text("Gosh, I hope she's okay...", 'nurse');

          // window hide
          yield clearText();

          // show nurse neutral at disappear_to_right
          yield hide('nurse', {
            with: {
              disappearTo: 'right',
            },
          });

          // pause 0.75
          yield pause(750);

          // "Hmm... the room smells a bit funny..."
          yield text('Hmm... the room smells a bit funny...');

          // "Oh, well. I better go and make sure [lindsey] is okay."
          yield text('Oh, well. I better go and make sure [lindsey] is okay.');
          break;
      }

      // window hide
      yield clearText();

      // show nurse concerned at left
      // show lindsey lindseypose01 behind nurse
      // show isabelle concerned at right
      // show black onlayer screens zorder 100
      // with Dissolve(.5)
      yield show('nurse', 'concerned', {
        at: 0.1,
        with: {
          dissolve: 0.5,
        },
      });
      yield show('lindsey', 'gym_fall', {
        at: 0.078,
        with: {
          dissolve: 0.5,
        },
      });
      yield show('isabelle', 'concerned', {
        /* TODO: Figure out how to show Isabelle above Lindsey */
        at: 0.75,
        with: {
          dissolve: 0.5,
        },
      });
      /* TODO: Show black background once able to */

      // pause 1.0
      yield pause(1000);

      // $quest.lindsey_nurse.advance("return_to_gym")
      yield qset({
        quest: 'loser_to_the_rescue',
        phase: 'hurry',
      });
      break;
  }

  const wentImmediately = yield get(
    /* TODO: Figure out how to properly call labels */
    (state) => state.quest.loser_to_the_rescue.phase === 'hurry'
  );

  if (!wentImmediately) {
    // mc "Right, I almost forgot! [lindsey] had an accident in the gym."
    yield text(
      'Right, I almost forgot! [lindsey] had an accident in the gym.',
      'mc'
    );

    // nurse neutral "My goodness! Let me just..."
    yield show('nurse', 'neutral');
    yield text('My goodness! Let me just...', 'nurse');

    // $school_nurse_room["curtain_off"] = False
    yield set({
      scene: 'school_nurse_room',
      curtain: 'closed',
    });

    // hide nurse with Dissolve(.5)
    yield hide('nurse', {
      with: {
        dissolve: 0.5,
      },
    });

    // nurse "..."
    yield text('...', 'nurse');

    // nurse "..."
    yield text('......', 'nurse');

    // $school_nurse_room["curtain_off"] = True
    yield set({
      scene: 'school_nurse_room',
      curtain: 'open',
    });

    // $nurse.equip("nurse_outfit")
    yield unequip('nurse', 'masturbating');
    yield equip('nurse', 'outfit');

    // show nurse neutral with Dissolve(.5)
    yield show('nurse', 'neutral', {
      at: 0.5,
      with: {
        dissolve: 0.5,
      },
    });

    // mc "We should probably hurry. She hit her head quite hard."
    yield text('We should probably hurry. She hit her head quite hard.', 'mc');

    // nurse neutral "Gosh, I hope she's okay..."
    yield text("Gosh, I hope she's okay...", 'nurse');

    // window hide
    yield clearText();

    // show nurse concerned at left
    // show lindsey lindseypose01 behind nurse
    // show isabelle concerned at right
    // show black onlayer screens zorder 100
    // with Dissolve(.5)
    yield show('nurse', 'concerned', {
      at: 0.1,
      with: {
        dissolve: 0.5,
      },
    });
    yield show('lindsey', 'gym_fall', {
      at: 0.078,
      with: {
        dissolve: 0.5,
      },
    });
    yield show('isabelle', 'concerned', {
      /* TODO: Figure out how to show Isabelle above Lindsey */
      at: 0.75,
      with: {
        dissolve: 0.5,
      },
    });
    /* TODO: Show black background once able to */

    // pause 1.0
    yield pause(1000);

    // $quest.lindsey_nurse.advance("return_to_gym")
    yield qset({
      quest: 'loser_to_the_rescue',
      phase: 'hurry',
    });
  }

  // $game.location = school_gym
  yield goto({ scene: 'school_gym', sceneTitle: 'Gym'});

  // hide black onlayer screens  with Dissolve(.5)
  /* TODO: Hide black background once able to */

  // nurse concerned "Goodness gracious, [lindsey]!"
  yield text('Goodness gracious, [lindsey]!', 'nurse');

  // lindsey lindseypose01 "It's not the knee this time, I think..."
  yield text("It's not the knee this time, I think...", 'lindsey');

  // isabelle concerned_left "No, it's way worse! She's been talking all sorts of nonsense while you were gone."
  yield equip('isabelle', 'looking_left');
  yield text(
    "No, it's way worse! She's been talking all sorts of nonsense while you were gone.",
    'isabelle'
  );

  // isabelle concerned_left "It's like the collision made her... drunk? Is that common?"
  yield text(
    "It's like the collision made her... drunk? Is that common?",
    'isabelle'
  );

  // nurse thinking "I don't know... I don't think it is..."
  yield show('nurse', 'thinking');
  yield text("I don't know... I don't think it is...", 'nurse');

  // nurse concerned "Can you help me get her up?"
  yield show('nurse', 'concerned');
  yield text('Can you help me get her up?', 'nurse');

  // isabelle neutral "Of course!"
  yield unequip('isabelle', 'looking_left');
  yield show('isabelle', 'neutral');
  yield text('Of course!', 'isabelle');

  // window hide
  yield clearText();

  // show nurse concerned at Position(xalign=.25)
  // show lindsey skeptical at Position(xalign=.5)
  // show isabelle neutral at Position(xalign=.75)
  // show black onlayer screens zorder 100
  // with Dissolve(.5)
  yield show('nurse', 'concerned', {
    at: 0.2,
    with: {
      dissolve: 0.5,
    },
  });
  yield show('lindsey', 'skeptical', {
    at: 0.425,
    with: {
      dissolve: 0.5,
    },
  });
  yield show('isabelle', 'neutral', {
    at: 0.65,
    with: {
      dissolve: 0.5,
    },
  });
  /* TODO: Show black background once able to */

  // pause 1.0
  yield pause(1000);

  // hide black onlayer screens with Dissolve(.5)
  /* TODO: Hide black background once able to */

  // lindsey skeptical "Why is the floor moving...?"
  yield text('Why is the floor moving...?', 'lindsey');

  // nurse thinking "I think you have a concussion, but I'll need to take you to my office for more tests."
  yield show('nurse', 'thinking');
  yield text(
    "I think you have a concussion, but I'll need to take you to my office for more tests.",
    'nurse'
  );

  // lindsey laughing "Do I get a lollipop?"
  yield show('lindsey', 'laughing');
  yield text('Do I get a lollipop?', 'lindsey');

  // nurse blush "I suppose that could be arranged..."
  yield show('nurse', 'blush');
  yield text('I suppose that could be arranged...', 'nurse');

  // nurse blush "Thank you, [mc]. I've got it from here."
  yield text("Thank you, [mc]. I've got it from here.", 'nurse');

  // menu(side="middle"):
  const thankYou = yield choices('middle', [
    // "?mc.owned_item('compromising_photo')@|{image=items compromising_photo}|\"I'll be in touch.\"":
    {
      id: 'touch',
      label: '"I\'ll be in touch."',
      icon: 'assets/items/compromising_photo.webp',
      condition: (state) => hasItem(state.character.mc, 'compromising_photo'),
    },
    // "\"I've always wanted to help out those in need. Glad I got the chance!\"":
    {
      id: 'help',
      label:
        '"I\'ve always wanted to help out those in need. Glad I got the chance!"',
    },
    // "\"I demand a kiss as payment! That's what all heroes get!\"":
    {
      id: 'kiss',
      label: '"I demand a kiss as payment! That\'s what all heroes get!"',
    },
    // "\"It's my fault she's hurt. Fetching you was the least I could do.\"":
    {
      id: 'fault',
      label:
        '"It\'s my fault she\'s hurt. Fetching you was the least I could do."',
    },
  ]);

  switch (thankYou) {
    case 'touch':
      // mc "I'll be in touch."
      yield text("I'll be in touch.", 'mc');

      // nurse afraid "W-what?"
      yield show('nurse', 'afraid');
      yield text('W-what?', 'nurse');

      // mc "About... you know."
      yield text('About... you know.', 'mc');

      // nurse annoyed "But I thought—"
      yield show('nurse', 'annoyed');
      yield text('But I thought—', 'nurse');

      // mc "We can discuss it now if you want! I don't think anyone would mind."
      yield text(
        "We can discuss it now if you want! I don't think anyone would mind.",
        'mc'
      );

      // $nurse.lust+=1
      yield cset(({ nurse }) => ({
        character: 'nurse',
        lust: nurse.lust + 1,
      }));

      // nurse afraid "No! That's okay!"
      yield show('nurse', 'afraid');
      yield text("No! That's okay!", 'nurse');

      // mc "Okay, then. Don't worry too much about it now. Just tend to [lindsey]."
      yield text(
        "Okay, then. Don't worry too much about it now. Just tend to [lindsey].",
        'mc'
      );

      // nurse neutral "Right... fine..."
      yield show('nurse', 'neutral');
      yield text('Right... fine...', 'nurse');

      // nurse neutral "Okay, [lindsey], please come with me."
      yield text('Okay, [lindsey], please come with me.', 'nurse');

      // window hide
      yield clearText();

      // show nurse neutral at disappear_to_left
      // show lindsey laughing at disappear_to_left
      // show isabelle neutral at move_to(.5,1.0)
      yield hide('nurse', {
        with: {
          disappearTo: 'left',
        },
      });
      yield hide('lindsey', {
        with: {
          disappearTo: 'left',
        },
      });
      yield moveTo('isabelle', 0.5);

      // $lindsey["at_none_now"] = True
      yield cset({
        character: 'lindsey',
        at_none_now: true,
      });

      // pause 0.5
      yield pause(500);
      break;
    case 'help':
      // mc "I've always wanted to help out those in need. Glad I got the chance!"
      yield text(
        "I've always wanted to help out those in need. Glad I got the chance!",
        'mc'
      );

      // $isabelle.lust+=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        lust: isabelle.lust + 1,
      }));

      // isabelle excited "That's a great goal to have!"
      yield show('isabelle', 'excited');
      yield text("That's a great goal to have!", 'isabelle');

      // $lindsey.love+=1
      yield cset(({ lindsey }) => ({
        character: 'lindsey',
        love: lindsey.love + 1,
      }));

      // lindsey smile "Thanks again! Sorry for running into you!"
      yield show('lindsey', 'smile');
      yield text('Thanks again! Sorry for running into you!', 'lindsey');

      // lindsey flirty "I hope it didn't hurt too much..."
      yield show('lindsey', 'flirty');
      yield text("I hope it didn't hurt too much...", 'lindsey');

      // mc "I'm fine! Never been better."
      yield text("I'm fine! Never been better.", 'mc');

      // lindsey laughing "That's nice. I'll see you around, [mc]!"
      yield show('lindsey', 'laughing');
      yield text("That's nice. I'll see you around, [mc]!", 'lindsey');

      // nurse blush "Okay, let's go."
      yield text("Okay, let's go.", 'nurse');

      // window hide
      yield clearText();

      // show nurse blush at disappear_to_left
      // show lindsey laughing at disappear_to_left
      // show isabelle excited at move_to(.5,1)
      yield hide('nurse', {
        with: {
          disappearTo: 'left',
        },
      });
      yield hide('lindsey', {
        with: {
          disappearTo: 'left',
        },
      });
      yield moveTo('isabelle', 0.5);

      // $lindsey["at_none_now"] = True
      yield cset({
        character: 'lindsey',
        at_none_now: true,
      });

      // pause 0.5
      yield pause(500);

      // "Somehow, being positive feels good."
      yield text('Somehow, being positive feels good.');

      // "Even though it's mostly forced and for show, everyone else seems to appreciate it..."
      yield text(
        "Even though it's mostly forced and for show, everyone else seems to appreciate it..."
      );

      // "Maybe that's worth it?"
      yield text("Maybe that's worth it?");
      break;
    case 'kiss':
      // mc "I demand a kiss as payment! That's what all heroes get!"
      yield text(
        "I demand a kiss as payment! That's what all heroes get!",
        'mc'
      );

      // $nurse.lust+=1
      yield cset(({ nurse }) => ({
        character: 'nurse',
        lust: nurse.lust + 1,
      }));

      // $lindsey.love-=1
      yield cset(({ lindsey }) => ({
        character: 'lindsey',
        love: lindsey.love - 1,
      }));

      // $isabelle.love-=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love - 1,
      }));

      // show nurse concerned
      // show lindsey skeptical
      // isabelle skeptical "Running to get the [nurse] hardly qualifies as heroic..."
      yield show('nurse', 'concerned');
      yield show('lindsey', 'skeptical');
      yield show('isabelle', 'skeptical');
      yield text(
        'Running to get the [nurse] hardly qualifies as heroic...',
        'isabelle'
      );

      // isabelle skeptical "Besides, heroes don't demand payment."
      yield text("Besides, heroes don't demand payment.", 'isabelle');

      // lindsey skeptical "Thanks for getting me help, but that's really not how it works..."
      yield text(
        "Thanks for getting me help, but that's really not how it works...",
        'lindsey'
      );

      // "Ugh, girls are the worst... so entitled to everything, yet never willing to pay up!"
      yield text(
        'Ugh, girls are the worst! So entitled to everything, yet never willing to pay up!'
      );

      // "Ridiculous, when you think about it. The nicer you are, the less they like you..."
      yield text(
        'Ridiculous, when you think about it. The nicer you are, the less they like you...'
      );

      // nurse concerned "Okay, [lindsey], please come with me."
      yield text('Okay, [lindsey], please come with me.', 'nurse');

      // window hide
      yield clearText();

      // show nurse concerned at disappear_to_left
      // show lindsey skeptical at disappear_to_left
      // show isabelle skeptical at move_to(.5,1)
      yield hide('nurse', {
        with: {
          disappearTo: 'left',
        },
      });
      yield hide('lindsey', {
        with: {
          disappearTo: 'left',
        },
      });
      yield moveTo('isabelle', 0.5);

      // $lindsey["at_none_now"] = True
      yield cset({
        character: 'lindsey',
        at_none_now: true,
      });

      // pause 0.5
      yield pause(500);
      break;
    case 'fault':
      // mc "It's my fault she's hurt. Fetching you was the least I could do."
      yield text(
        "It's my fault she's hurt. Fetching you was the least I could do.",
        'mc'
      );

      // $nurse.love+=1
      yield cset(({ nurse }) => ({
        character: 'nurse',
        love: nurse.love + 1,
      }));

      // nurse blush "That's a good attitude to have."
      yield text("That's a good attitude to have.", 'nurse');

      // $isabelle.love+=1
      yield cset(({ isabelle }) => ({
        character: 'isabelle',
        love: isabelle.love + 1,
      }));

      // isabelle excited "Yes, I like that! If everyone was more like you, the world would be a better place."
      yield show('isabelle', 'excited');
      yield text(
        'Yes, I like that! If everyone was more like you, the world would be a better place.',
        'isabelle'
      );

      // "That's probably a stretch and a half. I can hardly stand my reflection."
      yield text(
        "That's probably a stretch and a half. I can hardly stand my reflection."
      );

      // "Feels kinda nice that they noticed it, though! Trying to be a decent human being might not be so bad, after all..."
      yield text(
        'Feels kinda nice that they noticed it, though! Trying to be a decent human being might not be so bad, after all...'
      );

      // lindsey skeptical "I... I think I might pass out..."
      yield show('lindsey', 'skeptical');
      yield text('I... I think I might pass out...', 'lindsey');

      // nurse concerned "It's okay, there's a bed in my office. Lean on me."
      yield show('nurse', 'concerned');
      yield text("It's okay, there's a bed in my office. Lean on me.", 'nurse');

      // window hide
      yield clearText();

      // show nurse concerned at disappear_to_left
      // show lindsey skeptical at disappear_to_left
      // show isabelle excited at move_to(.5,1)
      yield hide('nurse', {
        with: {
          disappearTo: 'left',
        },
      });
      yield hide('lindsey', {
        with: {
          disappearTo: 'left',
        },
      });
      yield moveTo('isabelle', 0.5);

      // $lindsey["at_none_now"] = True
      yield cset({
        character: 'lindsey',
        at_none_now: true,
      });

      // pause 0.5
      yield pause(500);
      break;
  }

  // isabelle concerned_left "I hope she'll be okay..."
  yield equip('isabelle', 'looking_left');
  yield show('isabelle', 'concerned');
  yield text("I hope she'll be okay...", 'isabelle');

  // mc "I'm sure she'll be fine!"
  yield text("I'm sure she'll be fine!", 'mc');

  // isabelle excited "Oh, man! This tour turned out way more eventful than I expected!"
  yield unequip('isabelle', 'looking_left');
  yield show('isabelle', 'excited');
  yield text(
    'Oh, man! This tour turned out way more eventful than I expected!',
    'isabelle'
  );

  // isabelle excited "I think I need to sit down for a bit... Let's go to the cafeteria?"
  yield text(
    "I think I need to sit down for a bit... Let's go to the cafeteria?",
    'isabelle'
  );

  // mc "All right."
  yield text('All right.', 'mc');

  // hide isabelle with Dissolve(.5)
  yield hide('isabelle', {
    with: {
      dissolve: 0.5,
    },
  });

  // $quest.lindsey_nurse.finish()
  yield qset({
    quest: 'loser_to_the_rescue',
    phase: 'done',
  });
  yield complete('loser_to_the_rescue');

  // $quest.isabelle_tour.advance("cafeteria")
  /* TODO: Uncomment lines below once "Tour de School" has been coded in
  yield qset({
    quest: 'isabelle_tour',
    phase: 'cafeteria',
  }); */
};
