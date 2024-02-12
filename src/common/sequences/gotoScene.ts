// Types
import { Sequence } from 'components/SequenceContext';
import { Scene } from 'state/features/display';

// Actions
import { goto } from 'state/actions';

export interface GoToSceneProps {
  scene: Scene;
  sceneTitle: string;
}

export const gotoScene = function* ({ scene, sceneTitle }: GoToSceneProps): Sequence {
  yield goto({ scene, sceneTitle });
};
