// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { choices, text } from 'state/actions';

export const interact = function* (): Sequence {
  const choice = yield choices('middle', [
    { id: 'shot', label: 'Take the shot' },
    { id: 'dont', label: "Don't embarrass yourself" },
  ]);

  switch (choice) {
    case 'shot':
      yield text('...');

      yield text('Miss.');
      break;
    case 'dont':
      break;
  }
};
