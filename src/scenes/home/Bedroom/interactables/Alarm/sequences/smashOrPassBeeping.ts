import type { Sequence } from 'components/SequenceContext';
import { complete, cset, choices, text, set } from 'state/actions';

export const smashOrPassBeeping = function* (): Sequence {
  yield text('What should I do with this thing?');

  const choice = yield choices('middle', [
    { id: 'smash', label: 'Smash it' },
    { id: 'off', label: 'Turn it off' },
    { id: 'leave', label: 'Leave it' },
  ]);

  switch (choice) {
    case 'smash':
      yield cset(({ mc }) => ({
        character: 'mc',
        strength: mc.strength + 1,
      }));

      yield set({
        scene: 'home_bedroom',
        alarm: 'smashed',
        alarm_smash_combo: 1,
      });

      yield text('Ding-dong, the watch is dead!');
      // with vpunch

      yield text(
        'Who knew a proper smashing would feel so good? The testosterone! The sheer power!'
      );
      yield text("Ugh, I'm pathetic.");
      yield text(
        "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"
      );
      yield complete('smash_or_pass');
      break;
    case 'off':
      yield cset(({ mc }) => ({
        character: 'mc',
        intellect: mc.intellect + 1,
      }));

      yield set({
        scene: 'home_bedroom',
        alarm: 'off',
        alarm_smash_combo: 0,
      });

      yield text(
        "Smashing it would've been nice, but at least I don't have to clean up the pieces now."
      );
      yield text(
        "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"
      );
      yield complete('smash_or_pass');
      break;
    case 'leave':
      yield text('The melody of a better time. Might as well let it bump.');
      break;
  }
};
