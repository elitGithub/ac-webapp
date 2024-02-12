import type { Sequence } from 'components/SequenceContext';

import { show, hide } from 'state/features/character';
import { text } from 'state/features/display';
import { pause } from 'state/actions';

export const backToSchoolSpecialTalk = function* (): Sequence {
  yield show('jo', 'smile' /*, 'dissolve'*/);
  yield text(
    "Good morning! I hope you're ready for the new school year.",
    'jo'
  );
  yield hide('jo' /*, 'dissolve'*/);
  yield text(' ');
  yield pause(800);
};
