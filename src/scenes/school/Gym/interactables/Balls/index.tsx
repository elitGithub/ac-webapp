// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Balls: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Ball';
  const description = useDescription();
  const action = useAction();
  const scene = useAppSelector((state) => state.scene.school_gym);

  return (
    <Interactable
      id="balls"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/gym/ball_1.webp"
        offset={{ x: 0, y: 71 }}
      />

      <Asset
        asset="assets/locations/school/gym/ball_2.webp"
        offset={{ x: 108, y: 71 }}
      />

      {!scene.ball_3_hidden /* TODO: Adding conditionals inside composite interactables doesn't seem to work properly? */ && (
        <Asset
          asset="assets/locations/school/gym/ball_3.webp"
          offset={{ x: 1006, y: 296 }}
        />
      )}

      <Asset
        asset="assets/locations/school/gym/ball_5.webp"
        offset={{ x: 1183, y: 75 }}
      />

      {scene.ball_7_shown ===
      'six_pointer' /* TODO: Adding conditionals inside composite interactables doesn't seem to work properly? */ ? (
        <Asset
          asset="assets/locations/school/gym/ball_7.webp"
          offset={{ x: 1722, y: 43 }}
        />
      ) : scene.ball_7_shown ? (
        <Asset
          asset="assets/locations/school/gym/ball_7.webp"
          offset={{ x: 1570, y: 0 }}
        />
      ) : null}
    </Interactable>
  );
};

export default Balls;
