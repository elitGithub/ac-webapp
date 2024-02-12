// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { goto, hide,  } from 'state/actions';

export const gotoBedroom = function* (): Sequence {
  yield hide("kate", { with: { dissolve: 1000 } })
  yield goto({scene: 'intro', sceneTitle: 'Bedroom'});
};
