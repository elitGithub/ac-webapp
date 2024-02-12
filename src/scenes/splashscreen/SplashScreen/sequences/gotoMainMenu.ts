// Types
import { Sequence } from 'components/SequenceContext';

// Actions
import { goto } from 'state/actions';

export const gotoMainMenu = function* (): Sequence {
  yield goto({ scene: 'main_menu', sceneTitle: 'Main Menu' });
};
