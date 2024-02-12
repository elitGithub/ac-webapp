// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const interact = function* (): Sequence {
  yield text('She wears short skirts...');

  yield text('I wear T-shirts...');

  yield text("Chad's banging the cheer captain...");

  yield text('And I watch from the bleachers.');
};
