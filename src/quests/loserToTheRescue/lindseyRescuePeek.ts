// Actions
import {
  text,
  choices,
  equip,
  show,
  pause,
  unequip,
  cset,
  hide,
  clearText,
  qset,
} from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const lindseyRescuePeek = function* (): Sequence {
  // nurse "It looks like you have a concussion, [lindsey], but it's not severe."
  yield text(
    "It looks like you have a concussion, [lindsey], but it's not severe.",
    'nurse'
  );

  // lindsey  "Oh, no! How long 'til I can run again?"
  yield text("Oh, no! How long 'til I can run again?", 'lindsey');

  // nurse "It can take a while... You need to be careful."
  yield text('It can take a while... You need to be careful.', 'nurse');

  // lindsey  "What about the District Marathon?"
  yield text('What about the District Marathon?', 'lindsey');

  // nurse "If you rest well, you'll be back on your feet long before that."
  yield text(
    "If you rest well, you'll be back on your feet long before that.",
    'nurse'
  );

  // nurse "I'd like to look at your chest now. So, if you could take off your top, please?"
  yield text(
    "I'd like to look at your chest now. So, if you could take off your top, please?",
    'nurse'
  );

  // "This could be my only chance to see a pair of real-life boobs!"
  yield text('This could be my only chance to see a pair of real-life boobs!');

  // "But it might ruin my chances with [lindsey] for good... and I'd likely get detention..."
  yield text(
    "But it might ruin my chances with [lindsey] for good... and I'd likely get detention..."
  );

  // menu(side="middle"):
  const onlyChance = yield choices('middle', [
    // "Pull back the curtain":
    { id: 'pull', label: 'Pull back the curtain' },
    // "Don't be a creep":
    { id: 'dont', label: "Don't be a creep" },
  ]);

  switch (onlyChance) {
    case 'pull':
      yield clearText();

      // $unlock_replay("lindsey_exam")
      /* TODO: Add replay to the phone gallery once able to */

      // $unlock_stat_perk("lust13")
      /* TODO: Unlock perk once able to */

      // window hide
      yield clearText();

      // show lindsey clinic_nurse_confused_lindsey_neutral
      // show black onlayer screens zorder 100
      // with Dissolve(.5)
      yield equip('nurse', 'face_confused');
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

      // hide black onlayer screens with Dissolve(.5)
      /* TODO: Hide black background once able to */

      // nurse clinic_nurse_confused "Okay, let's get that bra off so I can listen to your heart."
      yield text(
        "Okay, let's get that bra off so I can listen to your heart.",
        'nurse'
      );

      // lindsey clinic_lindsey_neutral_topless "Okay..."
      yield unequip('lindsey', 'bra');
      /* TODO: Figure out the best way to switch between variations of a special scene */
      yield text('Okay...', 'lindsey');

      // nurse clinic_nurse_surprised "Huh?"
      yield unequip('nurse', 'face_confused');
      yield equip('nurse', 'face_surprised');
      /* TODO: Figure out the best way to switch between variations of a special scene */
      yield text('Huh?', 'nurse');

      // lindsey clinic_lindsey_scared_topless "Aaah!"
      yield unequip('lindsey', 'face_neutral');
      yield equip('lindsey', 'face_scared');
      /* TODO: Figure out the best way to switch between variations of a special scene */
      yield text('Aaah!', 'lindsey');

      // "Some prophets may call this a heavy risk, but there it finally is — the prize."
      yield text(
        'Some prophets may call this a heavy risk, but there it finally is — the prize.'
      );

      // "People would kill to see [lindsey]'s tits. There's a big chance that no man has ever seen her naked."
      yield text(
        "People would kill to see [lindsey]'s tits. There's a big chance that no man has ever seen her naked."
      );

      // "That's what makes this so special."
      yield text("That's what makes this so special.");

      // "Judging by the tan lines, even the sun's been deprived of the soft flesh of her chest."
      yield text(
        "Judging by the tan lines, even the sun's been deprived of the soft flesh of her chest."
      );

      // "The unblemished snow-white skin — a sharp but enticing contrast to the soft pink of her areolas."
      yield text(
        'The unblemished snow-white skin — a sharp but enticing contrast to the soft pink of her areolas.'
      );

      // "Some girls sunbathe to get an even tan, but [lindsey] clearly doesn't care about that."
      yield text(
        "Some girls sunbathe to get an even tan, but [lindsey] clearly doesn't care about that."
      );

      // "As long as her sports bra keeps her boobs from bouncing!"
      yield text('As long as her sports bra keeps her boobs from bouncing!');

      // "If only she'd allow me to reach out, weigh them in my hands, squeeze them gently..."
      yield text(
        "If only she'd allow me to reach out, weigh them in my hands, squeeze them gently..."
      );

      // "Or roughly, whatever she prefers! Twist her nipples... or give them kind and gentle kisses..."
      yield text(
        'Or roughly, whatever she prefers! Twist her nipples... or give them kind and gentle kisses...'
      );

      // $mc.lust+=1
      yield cset(({ mc }) => ({
        character: 'mc',
        lust: mc.lust + 1,
      }));

      // "There are so many possibilities! Play with them! Nibble them! Suck them!"
      yield text(
        'There are so many possibilities! Play with them! Nibble them! Suck them!'
      );

      // "So soft and supple — so forbidden — joy-sized perfection!"
      yield text('So soft and supple — so forbidden — joy-sized perfection!');

      // nurse clinic_nurse_surprised "What in god's name?!"
      yield text("What in god's name?!", 'nurse');

      // menu(side="far_right"):
      const curtainPulled = yield choices('right', [
        // "\"Just claiming my reward for helping you.\"":
        { id: 'reward', label: '"Just claiming my reward for helping you."' },
        // "\"I'm sorry, but I figured I'd only have one chance at seeing an angel the way god made her...\"":
        {
          id: 'angel',
          label:
            '"I\'m sorry, but I figured I\'d only have one chance at seeing an angel the way god made her..."',
        },
        // "?mc.charisma>=3@[mc.charisma]/3|{image=stats cha}|\"I was going to see them sooner or later, anyway.\"":
        {
          id: 'anyway',
          label: '"I was going to see them sooner or later, anyway."',
          icon: 'assets/characters/stats/cha.webp',
          iconValue: (state) =>
            `${Math.min(state.character.mc.charisma ?? 0, 3)}/3`,
          condition: (state) => state.character.mc.charisma >= 3,
        },
      ]);

      switch (curtainPulled) {
        case 'reward':
          // mc "Just claiming my reward for helping you."
          yield text('Just claiming my reward for helping you.', 'mc');

          // $lindsey.love-=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            love: lindsey.love - 1,
          }));

          // $lindsey.lust-=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            lust: lindsey.lust - 1,
          }));

          // lindsey clinic_lindsey_angry_topless "That's sick! Go away!"
          yield unequip('lindsey', 'face_scared');
          yield equip('lindsey', 'face_angry');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text("That's sick! Go away!", 'lindsey');

          // $nurse.love-=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            love: nurse.love - 1,
          }));

          // $nurse.lust-=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            lust: nurse.lust - 1,
          }));

          // nurse clinic_nurse_angry "That is outrageous, [mc]!"
          yield unequip('nurse', 'face_surprised');
          yield equip('nurse', 'face_angry');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('That is outrageous, [mc]!', 'nurse');

          // nurse clinic_nurse_angry "Wait until [jo] hears about this..."
          yield text('Wait until [jo] hears about this...', 'nurse');

          // #$ Detention = "Active"
          /* TODO: Give the MC detention once able to */

          // $lindsey["romance_disabled"] = True
          yield cset({
            character: 'lindsey',
            romance_disabled: true,
          });

          // $game.notify_modal(None,"Love or Lust","Romance with [lindsey]:\nDisabled.",wait=5.0)
          /* TODO: Notify player once able to */
          break;
        case 'angel':
          // mc "I'm sorry, but I figured I'd only have one chance at seeing an angel the way god made her..."
          yield text(
            "I'm sorry, but I figured I'd only have one chance at seeing an angel the way god made her...",
            'mc'
          );

          // $lindsey.love+=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            love: lindsey.love + 1,
          }));

          // lindsey clinic_lindsey_blush_topless "That's oddly nice..."
          yield unequip('lindsey', 'face_scared');
          yield equip('lindsey', 'face_blush');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text("That's oddly nice...", 'lindsey');

          // $nurse.love-=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            love: nurse.love - 1,
          }));

          // nurse clinic_nurse_angry "No, it's inappropriate, and I'm reporting it!"
          yield unequip('nurse', 'face_surprised');
          yield equip('nurse', 'face_angry');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text("No, it's inappropriate, and I'm reporting it!", 'nurse');

          // nurse clinic_nurse_angry "Get out of here, [mc]."
          yield text('Get out of here, [mc].', 'nurse');

          // $Detention = "Active"
          /* TODO: Give the MC detention once able to */
          break;
        case 'anyway':
          // mc "I was going to see them sooner or later, anyway."
          yield text('I was going to see them sooner or later, anyway.', 'mc');

          // $lindsey.lust+=1
          yield cset(({ lindsey }) => ({
            character: 'lindsey',
            lust: lindsey.lust + 1,
          }));

          // lindsey clinic_lindsey_laughing_topless "Oh, my god!"
          yield unequip('lindsey', 'face_scared');
          yield equip('lindsey', 'face_laughing');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('Oh, my god!', 'lindsey');

          // mc "I agree... two-fold."
          yield text('I agree... two-fold.', 'mc');

          // lindsey clinic_lindsey_blush_topless "Oh, my god!"
          yield unequip('lindsey', 'face_laughing');
          yield equip('lindsey', 'face_blush');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('Oh, my god!', 'lindsey');

          // $nurse.lust+=1
          yield cset(({ nurse }) => ({
            character: 'nurse',
            lust: nurse.lust + 1,
          }));

          // nurse clinic_nurse_confused "Young love, huh? Okay, please pull back the curtain now."
          yield unequip('nurse', 'face_surprised');
          yield equip('nurse', 'face_confused');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text(
            'Young love, huh? Okay, please pull back the curtain now.',
            'nurse'
          );

          // mc "Who said anything about love?"
          yield text('Who said anything about love?', 'mc');

          // lindsey clinic_lindsey_annoyed_topless "Oh, my god!"
          yield unequip('lindsey', 'face_blush');
          yield equip('lindsey', 'face_annoyed');
          /* TODO: Figure out the best way to switch between variations of a special scene */
          yield text('Oh, my god!', 'lindsey');
          break;
      }

      // window hide
      yield clearText();

      // show black onlayer screens zorder 100 with Dissolve(.5)
      /* TODO: Show black background once able to */

      // pause 1.0
      yield pause(1000);

      // hide lindsey
      // hide black onlayer screens
      // with Dissolve(.5)
      yield hide('lindsey', {
        with: {
          dissolve: 0.5,
        },
      });
      /* TODO: Hide black background once able to */

      break;
    case 'dont':
      // $unlock_stat_perk("love13")
      /* TODO: Unlock perk once able to */

      // $mc.love+=2
      yield cset(({ mc }) => ({
        character: 'mc',
        love: mc.love + 2,
      }));

      // "Old me would've jumped at the opportunity, but this is my chance to be better. To learn from my mistakes."
      yield text(
        "Old me would've jumped at the opportunity, but this is my chance to be better. To learn from my mistakes."
      );

      // "Someone once told me that being decent goes a long way..."
      yield text('Someone once told me that being decent goes a long way...');

      // "It always seemed like good advice."
      yield text('It always seemed like good advice.');

      // lindsey "Don't tell him, but [mc] made me feel really cared for..."
      yield text(
        "Don't tell him, but [mc] made me feel really cared for...",
        'lindsey'
      );

      // nurse "He did look concerned when he brought you in."
      yield text('He did look concerned when he brought you in.', 'nurse');

      // nurse "Okay, take a deep breath."
      yield text('Okay, take a deep breath.', 'nurse');

      // lindsey "..."
      yield text('...', 'lindsey');

      // nurse "Your chest looks fine. You do have an elevated heart rate, but I don't think it's related..."
      yield text(
        "Your chest looks fine. You do have an elevated heart rate, but I don't think it's related...",
        'nurse'
      );

      // lindsey "Heh... probably not!"
      yield text('Heh... probably not!', 'lindsey');
      break;
  }

  // $quest.lindsey_nurse.finish()
  yield qset({
    quest: 'loser_to_the_rescue',
    phase: 'leave',
  });

  yield unequip('nurse', 'face_angry');
  yield unequip('nurse', 'face_confused');
  yield unequip('lindsey', 'face_angry');
  yield unequip('lindsey', 'face_blush');
  yield unequip('lindsey', 'face_annoyed');
  yield equip('lindsey', 'bra');
  yield equip('lindsey', 'jacket');
  /* TODO: Figure out the best way to switch between variations of a special scene */
};
