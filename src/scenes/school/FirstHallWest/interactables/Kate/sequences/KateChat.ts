// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { show, hide } from 'state/features/character';
import { text } from 'state/features/display';

export const KateChat = function* (): Sequence {
  yield show('kate', 'cringe' /*, 'dissolve'*/);
  yield text('Gross.', 'kate');
  yield text("Don't talk to me.", 'kate');
  yield hide('kate' /*, 'dissolve'*/);
  yield text(' ');
};
