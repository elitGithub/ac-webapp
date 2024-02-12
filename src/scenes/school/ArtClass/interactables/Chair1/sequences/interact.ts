// Types
import { Sequence } from 'components/SequenceContext';
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('Naked butts sometimes touch these chairs.');
  yield text("I'll have to come back later for some thorough sniffing.");
};
