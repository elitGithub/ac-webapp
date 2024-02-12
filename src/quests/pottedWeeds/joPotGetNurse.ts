// Sequence: joPotGetNurse
import type { Sequence } from 'components/SequenceContext';

import {
  choices,
  cset,
  get,
  hide,
  pause,
  qset,
  set,
  show,
  text,
} from 'state/actions';
import { hasItem } from 'state/features/character';

// label quest_jo_pot_getnurse:
export const joPotGetNurse = function* (): Sequence {
  // show nurse concerned with Dissolve(.5)
  yield show('nurse', 'concerned');

  // nurse concerned "[mc], are you drinking enough water? You look a little parched."
  yield text(
    '[mc], are you drinking enough water? You look a little parched.',
    'nurse'
  );

  // mc "You're absolutely right. I'm parched in ways you can't even begin to imagine."
  yield text(
    "You're absolutely right. I'm parched in ways you can't even begin to imagine.",
    'mc'
  );

  // mc "That's part of why I'm here."
  yield text("That's part of why I'm here.", 'mc');

  // nurse annoyed "That's... disappointing to hear. Have a bottle of water first."
  yield show('nurse', 'annoyed');
  yield text(
    "That's... disappointing to hear. Have a bottle of water first.",
    'nurse'
  );

  // if not quest.jo_potted["nurese_gave_bottle"]:
  //   $mc.add_item("water_bottle")
  //   $quest.jo_potted["nurese_gave_bottle"] = True
  const gotBottle = yield get(
    (state) => state.quest.potted_weeds.nurse_gave_bottle
  );
  if (!gotBottle) {
    // TODO: $mc.add_item('water_bottle');
    yield qset({
      quest: 'potted_weeds',
      nurse_gave_bottle: true,
    });
  }

  // nurse annoyed "Try to stay away from the sodas in the cafeteria if you can."
  yield text(
    'Try to stay away from the sodas in the cafeteria if you can.',
    'nurse'
  );

  // mc "Thanks, but my thirst is a bit different."
  yield text('Thanks, but my thirst is a bit different.', 'mc');

  // mc "Anyway, I've been getting into agriculture lately, and I was hoping you could give me a hand."
  yield text(
    "Anyway, I've been getting into agriculture lately, and I was hoping you could give me a hand.",
    'mc'
  );

  // nurse concerned "I don't really know anything about that..."
  yield show('nurse', 'concerned');
  yield text("I don't really know anything about that...", 'nurse');

  // mc "Neither do the oxen. They just follow the farmer's directions."
  yield text(
    "Neither do the oxen. They just follow the farmer's directions.",
    'mc'
  );

  // nurse thinking "I suppose that's true, but I'm very short on time and have to get back to work..."
  yield show('nurse', 'thinking');
  yield text(
    "I suppose that's true, but I'm very short on time and have to get back to work...",
    'nurse'
  );

  // show nurse thinking at move_to(.25)
  yield show('nurse', 'thinking', {
    at: 0.25,
  });

  const nurseChoice = yield choices('right', [
    {
      id: 'blackmail',
      label: "You'll make some time.",
      icon: 'compromising_photo',
      condition: (state) => hasItem(state.character.mc, 'compromising_photo'),
    },
    {
      id: 'no_worries',
      label: "No worries, I'll find another way.",
    },
  ]);

  switch (nurseChoice) {
    case 'blackmail':
      // show nurse thinking at move_to(.5)
      yield show('nurse', 'thinking', {
        at: 0.5,
      });

      // mc "You'll make some time."
      yield text("You'll make some time.", 'mc');

      // mc "Because if you don't, you know what happens."
      yield text("Because if you don't, you know what happens.", 'mc');

      // nurse annoyed "I... didn't think the blackmail would mean flipping dirt on a field..."
      yield show('nurse', 'annoyed');
      yield text(
        "I... didn't think the blackmail would mean flipping dirt on a field...",
        'nurse'
      );

      // mc "Ah, you're worried it won't be interesting enough?"
      yield text("Ah, you're worried it won't be interesting enough?", 'mc');

      // mc "Trust me, it'll be very interesting."
      yield text("Trust me, it'll be very interesting.", 'mc');

      // nurse afraid "No, that's not what I meant!"
      yield show('nurse', 'afraid');
      yield text("No, that's not what I meant!", 'nurse');

      // mc "Let's get going."
      yield text("Let's get going.", 'mc');

      // nurse concerned "Okay..."
      yield show('nurse', 'concerned');
      yield text('Okay...', 'nurse');

      // $quest.jo_potted.advance("plowcow")
      yield qset({
        quest: 'potted_weeds',
        plowcow: true,
      });

      // $nurse["plowcow_now"] = True
      yield cset({
        character: 'nurse',
        plowcow: true,
      });

      // $school_forest_glade["exclusive"] = "nurse"
      yield set({
        scene: 'school_forest_glade',
        exclusive: 'nurse',
      });

      // show nurse concerned at disappear_to_right
      yield show('nurse', 'concerned', {
        with: {
          disappearTo: 'right',
        },
      });

      // pause(1)
      yield pause(1000);
      break;
    case 'no_worries':
      // show nurse thinking at move_to(.5)
      yield show('nurse', 'thinking', {
        at: 0.5,
      });

      // mc "No worries, I'll find another way."
      yield text("No worries, I'll find another way.", 'mc');

      // mc "You would've looked hot plowing that field for me, but I understand."
      yield text(
        "You would've looked hot plowing that field for me, but I understand.",
        'mc'
      );

      // if nurse.love>=3:
      const nurseLove = (yield get(
        (state) => state.character.nurse.love
      )) as number;
      if (nurseLove >= 3) {
        // nurse blush "I admire you thinking about organic produce."
        yield show('nurse', 'blush');
        yield text('I admire you thinking about organic produce.', 'nurse');

        // nurse blush "I have a break now... I could probably help you out."
        yield show('nurse', 'blush');
        yield text(
          'I have a break now... I could probably help you out.',
          'nurse'
        );

        // show nurse blush at move_to(.75)
        yield show('nurse', 'blush', {
          at: 0.75,
        });
        // menu(side="left"):
        //   extend ""
        //   "\"No, I've changed my mind. You're too nice.\"":
        //   "\"All right, follow me.\"":
        const acceptHelp = yield choices('left', [
          {
            id: 'changedMind',
            label: "No, I've changed my mind. You're too nice.",
          },
          { id: 'followMe', label: 'All right, follow me.' },
        ]);

        switch (acceptHelp) {
          case 'changedMind':
            // show nurse blush at move_to(.5)
            yield show('nurse', 'blush', {
              at: 0.5,
            });

            // mc "No, I've changed my mind. You're too nice."
            yield text("No, I've changed my mind. You're too nice.", 'mc');

            // if not quest.jo_potted["nurese_gave_love"]:
            const nurseGaveLove = yield get(
              (state) => state.quest.potted_weeds.nurse_gave_love
            );
            if (!nurseGaveLove) {
              // $nurse.love+=2
              yield cset({
                character: 'nurse',
                love: nurseLove + 2,
              });
              // $quest.jo_potted["nurese_gave_love"] = True
              yield qset({
                quest: 'potted_weeds',
                nurse_gave_love: true,
              });
            }

            // nurse concerned "Oh, okay then."
            yield show('nurse', 'concerned');
            yield text('Oh, okay then.', 'nurse');

            // nurse concerned "I... I hope you have a good day."
            yield text('I... I hope you have a good day.', 'nurse');

            // nurse blush "I'm just going to go..."
            yield show('nurse', 'blush');
            yield text("I'm just going to go...", 'nurse');

            // "The [nurse] looks so embarrassed, her face is like a tomato."
            yield text(
              'The Nurse looks so embarrassed, her face is like a tomato.'
            );

            // "She probably would've enjoyed plowing the fields, but maybe she's not ready for that kind of humiliation."
            yield text(
              "She probably would've enjoyed plowing the fields, but maybe she's not ready for that kind of humiliation."
            );

            // "It's better to be nice to her for now."
            yield text("It's better to be nice to her for now.");

            // hide nurse blush with Dissolve(.5)
            yield hide('nurse', {
              with: {
                dissolve: 0.5,
              },
            });
            break;
          case 'followMe':
            // show nurse blush at move_to(.5)
            yield show('nurse', 'blush', {
              at: 0.5,
            });

            // mc "All right, follow me."
            yield text('All right, follow me.', 'mc');

            // nurse smile "Where are we going?"
            yield show('nurse', 'smile');
            yield text('Where are we going?', 'nurse');

            // mc "To my field, of course."
            yield text('To my field, of course.', 'mc');

            // mc "I told you. You're going to plow it for me."
            yield text("I told you. You're going to plow it for me.", 'mc');

            // nurse annoyed "O-okay..."
            yield show('nurse', 'annoyed');
            yield text('O-okay...', 'nurse');

            // $quest.jo_potted.advance("plowcow")
            yield qset({
              quest: 'potted_weeds',
              phase: 'plowcow',
            });

            // $nurse["plowcow_now"] = True
            yield cset({
              character: 'nurse',
              plowcow: true,
            });

            // $school_forest_glade["exclusive"] = "nurse"
            yield set({
              scene: 'school_forest_glade',
              exclusive: 'nurse',
            });

            // show nurse annoyed at disappear_to_right
            yield hide('nurse', {
              with: {
                disappearTo: 'right',
              },
            });

            // pause(1)
            yield pause(1000);
            break;
        }
      } else {
        // else:
        // nurse blush "Okay..."
        yield show('nurse', 'blush');
        yield text('Okay...', 'nurse');

        // nurse blush "I'm just going to go..."
        yield text("I'm just going to go...", 'nurse');

        // "The [nurse] looks so embarrassed, her face is like a tomato."
        yield text(
          'The Nurse looks so embarrassed, her face is like a tomato.'
        );

        // "She probably would've enjoyed plowing the fields, but maybe she's not ready for that kind of humiliation."
        yield text(
          "She probably would've enjoyed plowing the fields, but maybe she's not ready for that kind of humiliation."
        );

        // "It's better to be nice to her for now."
        yield text("It's better to be nice to her for now.");

        // hide nurse blush with Dissolve(.5)
        yield hide('nurse', {
          with: {
            dissolve: 0.5,
          },
        });
      }
      break;
  }
};
