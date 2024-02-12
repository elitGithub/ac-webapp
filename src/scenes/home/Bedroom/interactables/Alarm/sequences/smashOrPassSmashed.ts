import type { Sequence } from 'components/SequenceContext';

import { text } from 'state/features/display';

export const smashOrPassSmashed = function* (): Sequence {
  yield text(
    'You tell me, "All I\'ve done is create more despair and destruction in my environment."'
  );

  yield text('I ask you, "Why did it feel so good then?"');
};
