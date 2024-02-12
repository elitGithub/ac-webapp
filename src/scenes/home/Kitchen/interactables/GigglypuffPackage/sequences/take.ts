// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { addItem, qset, text } from 'state/actions';

export const take = function* (): Sequence {
  yield text('Glad I found the package first. No awkward questions.');

  yield addItem('mc', 'package_gigglypuff_seeds');

  yield qset({
    quest: 'potted_weeds',
    phase: 'open_package',
  });
};
