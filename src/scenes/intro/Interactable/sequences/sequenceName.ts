// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { text } from 'state/actions';

export const sequenceName = function* (): Sequence {
  yield text(
    'Those deprived of sympathy can still break the circle of abuse. Jesus turned the other cheek and so can I.'
  );

  yield text(
    'Except if there are clock-merchants involved, those get righteously whipped out of the temple.'
  );
};
