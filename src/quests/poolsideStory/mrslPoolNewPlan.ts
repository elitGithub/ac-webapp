// Actions
import { show, text, hide, qset } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const mrslPoolNewPlan = function* (): Sequence {
  // show mrsl neutral with Dissolve(.5)
  yield show('mrsl', 'neutral', {
    at: 0.5,
    with: {
      dissolve: 0.5,
    },
  });

  // mrsl neutral "How can I help you, [mc]?"
  yield text('How can I help you, [mc]?', 'mrsl');

  // mc "The pool is closed until after the Newfall Independence Day festivities..."
  yield text(
    'The pool is closed until after the Newfall Independence Day festivities...',
    'mc'
  );

  // mrsl surprised "Oh, that's right! I forgot to tell you about that."
  yield show('mrsl', 'surprised');
  yield text("Oh, that's right! I forgot to tell you about that.", 'mrsl');

  // mc "What about my swim team tryout?"
  yield text('What about my swim team tryout?', 'mc');

  // mrsl concerned "Unfortunately, you'll have to wait until after Christmas."
  yield show('mrsl', 'concerned');
  yield text(
    "Unfortunately, you'll have to wait until after Christmas.",
    'mrsl'
  );

  // mrsl concerned "The season is starting and the school's roster must be finalized before the Newfall Independence Day."
  yield text(
    "The season is starting and the school's roster must be finalized before the Newfall Independence Day.",
    'mrsl'
  );

  // "Great. So, me trying to ruin the festivities last year really only ruined it for myself? Fuck."
  yield text(
    'Great. So, me trying to ruin the festivities last year really only ruined it for myself? Fuck.'
  );

  // "Well, I guess it ruined it for any freshmen swimmers too..."
  yield text('Well, I guess it ruined it for any freshmen swimmers too...');

  // "Not that my goal was to actually join the swim team. I just wanted to see [mrsl] in a swimsuit."
  yield text(
    'Not that my goal was to actually join the swim team. I just wanted to see [mrsl] in a swimsuit.'
  );

  // mc "All right. That's too bad."
  yield text("All right. That's too bad.", 'mc');

  // mrsl excited "I hope you come and cheer for us when the season starts still."
  yield show('mrsl', 'excited');
  yield text(
    'I hope you come and cheer for us when the season starts still.',
    'mrsl'
  );

  // hide mrsl with Dissolve(.5)
  yield hide('mrsl', {
    with: {
      dissolve: 0.5,
    },
  });

  // "Hmm... maybe there's a way to get around this. Surely, the freshmen won't be happy about this."
  yield text(
    "Hmm... maybe there's a way to get around this. Surely, the freshmen won't be happy about this."
  );

  // "If I get enough signatures, maybe the board will reverse the decision..."
  yield text(
    'If I get enough signatures, maybe the board will reverse the decision...'
  );

  // "Getting wet with [mrsl] is something worth fighting for."
  yield text('Getting wet with [mrsl] is something worth fighting for.');

  // "The newbies always check the bulletin board in the entrance hall."
  yield text(
    'The newbies always check the bulletin board in the entrance hall.'
  );

  // "Putting a petition there would be ideal."
  yield text('Putting a petition there would be ideal.');

  // "[jo] knows everything about petitions, but she also knows I wouldn't petition for anything."
  yield text(
    "[jo] knows everything about petitions, but she also knows I wouldn't petition for anything."
  );

  // "[isabelle] on the other hand would probably see this as a great injustice..."
  yield text(
    '[isabelle] on the other hand would probably see this as a great injustice...'
  );

  // $quest.poolside_story.advance("petition")
  yield qset({
    quest: 'poolside_story',
    phase: 'petition',
  });
};
