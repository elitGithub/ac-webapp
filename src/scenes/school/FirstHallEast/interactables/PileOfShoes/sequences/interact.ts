// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('There was a suspected shoe sniffer a couple of years back.');

  yield text(
    'All the hot girls started putting their shoes in their bags or lockers after that.'
  );

  yield text("Apparently, they'd been the serial sniffer's prime targets.");
};
