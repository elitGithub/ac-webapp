// Actions
import { text, goto, show, pause, hide } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';
import { SequenceContext } from 'components/SequenceContext';

export const dayOneTakeTwoHomeroomDoor = function* (): Sequence {
  yield text('Okay, here goes nothing.');

  yield goto({ scene: 'school_homeroom', sceneTitle: 'Homeroom' });

  yield text(
    'The thick smell of freshly sharpened pencils, cheap perfume, and cigarette smoke always gave the homeroom a shady character.'
  );
  yield text(
    "It's the only room in the school that could, by smell alone, be mistaken for a seedy strip club."
  );
  yield text(
    'For whatever reason, the janitor never scrubbed this floor with her signature lemon soap, and that still seems to be the case.'
  );
  yield text(
    'Normally, keeping my head down would be my first instinct, but the girls are all busy hugging and chatting.'
  );
  yield text("And the guys... they're all busy staring at...");

  // yield show('mrsl', 'thinking', { with: { dissolve: 5000 } });
  // yield show('mrsl', 'afraid', { with: { dissolve: 5000 } });
  // yield show('mrsl', 'annoyed', { with: { dissolve: 5000 } });
  yield show('mrsl', 'neutral', { with: { dissolve: 300 } });
  // yield pause(1000);

  yield text(
    "That's... Whoa! What happened to the cardigan and knitted socks?"
  );
  yield text(
    "It's like she just woke up from hibernation and decided that sex appeal is the new black."
  );
  yield show('mrsl', 'thinking', { with: { dissolve: 5000 } });
  yield text(
    "Holy smokes. No wonder the guys aren't paying attention to their favorite victim."
  );
  yield show('mrsl', 'sad', { with: { dissolve: 5000 } });
  // yield show('mrsl', 'excited');
  yield text(
    "Welcome to your final year of high school! I hope you're as excited as I am.",
    'mrsl'
  );
  yield show('mrsl', 'concerned', { with: { dissolve: 5000 } });
  yield text("It's okay, you don't have to sit down...", 'mrsl');
  //show mrsl flirty with Dissolve(50000)
  //pause(0.8);
  yield show('mrsl', 'blush', { with: { dissolve: 5000 } });
  
  yield text('...unless you need to!', 'mrsl');
  yield show('mrsl', 'flirty', { with: { dissolve: 5000 } });
  
  //yield show('mrsl', 'excited', { with: { dissolve: 10000 } });
  yield text(
    "My name is Mrs. Lichtenstein and I'll be your homeroom teacher.",
    'mrsl'
  );
  yield show('mrsl', 'cringe', { with: { dissolve: 1000 } });
  
  yield text('This year, things are going to be a bit different.', 'mrsl');
  yield text(
    'Newfall High has been selected for an experimental program.',
    'mrsl'
  );
  yield text(
    "Some of you might've heard about the new curriculum already, but for those who haven't, this is how it'll work.",
    'mrsl'
  );
  yield hide('mrsl');
};
