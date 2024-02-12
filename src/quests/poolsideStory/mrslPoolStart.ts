// Actions
import { show, text, cset, hide, start, qset } from 'state/actions';

// Types
import type { Sequence } from 'components/SequenceContext';

export const mrslPoolStart = function* (): Sequence {
  // show mrsl smile with Dissolve(.5)
  yield show('mrsl', 'smile', {
    at: 0.5,
    with: {
      dissolve: 0.5,
    },
  });

  // mrsl smile "Hi, [mc]! How can I help you today?"
  yield text('Hi, [mc]! How can I help you today?', 'mrsl');

  // $mc.strength+=1
  yield cset(({ mc }) => ({
    character: 'mc',
    strength: mc.strength + 1,
  }));

  // mc "I'd like to try out for the swim team."
  yield text("I'd like to try out for the swim team.", 'mc');

  // $mrsl.lust+=1
  yield cset(({ mrsl }) => ({
    character: 'mrsl',
    lust: mrsl.lust + 1,
  }));

  // mrsl laughing "Stop by the pool later, and we'll see what happens..."
  yield show('mrsl', 'laughing');
  yield text("Stop by the pool later, and we'll see what happens...", 'mrsl');

  // "Did she just? No..."
  yield text('Did she just? No...');

  // "Must be my imagination."
  yield text('Must be my imagination.');

  // hide mrsl with Dissolve(.5)
  yield hide('mrsl', {
    with: {
      dissolve: 0.5,
    },
  });

  // $quest.poolside_story.start()
  yield start('poolside_story');
  yield qset({
    quest: 'poolside_story',
    phase: 'pool_closed',
  });
};
