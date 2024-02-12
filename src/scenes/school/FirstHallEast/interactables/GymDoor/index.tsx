// Libraries
import React from 'react';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const GymDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Gym';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="gym_door"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/gym.webp"
        offset={{ x: 0, y: 27 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/gym_sign.webp"
        offset={{ x: 56, y: 0 }}
      />
    </Interactable>
  );
};

export default GymDoor;
