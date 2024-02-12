import type { Sequence } from 'components/SequenceContext';

import { text } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  yield text("She's probably had enough of my chitchat for today.");
};
