// Actions
import { show, text, hide, qset, start, goto, pause } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const dayOneTakeTwoStart = function* (): Sequence {
  // show black
  yield text(
    "Whatever awaits me on the other side, I've already been through before.",
    'mc'
  );
  yield text("With some luck, it won't be nearly as bad.", 'mc');

  // $quest.dayonetaketwo.start()
  yield start('dayonetaketwo');
  yield qset({
    quest: 'dayonetaketwo',
    phase: 'start',
  });

  yield goto({ scene: 'school_entrance', sceneTitle: 'Entrance' });
  // pause and hide the text after going to a scene
  yield pause(500);

  yield text(
    'Newfall High — the perfect place to have your confidence shattered and your hopes turned to dust, while on a semi-strict diet of eggos and strawberry juice.',
    'mc'
  );
  yield text(
    'Halls infested with gaggles of harpies, who snigger and quickly pass you by, but stop and fawn over idiot jocks.',
    'mc'
  );
  yield text(
    'She-devils in skimpy dresses, flaunting their bodies and brace-perfect smiles, reminding you that happiness and success are only for attractive people.',
    'mc'
  );
  yield text(
    'Classroom-dwelling tormentors, whose only pleasure in life is screwing you over with a big fat D.',
    'mc'
  );
  yield text(
    'And, of course, the principal... who keeps the rotting cogs turning and the social hierarchy intact.',
    'mc'
  );
  yield text('To actually be back. Fuck.', 'mc');
  yield text(
    "The odds aren't going to be fair this time around either... but if I really did travel back in time, at least I know what's coming.",
    'mc'
  );
  yield text("Perhaps there's a chance for some sort of redemption?", 'mc');
  yield text('Perhaps...', 'mc');
  yield text('This again?', 'mc');

  //play sound "phone_vibrate"
  //$set_dialog_mode("phone_message","hidden_number")
  //hidden_number "Blasted technology! Apologies for earlier."
};
