// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const GymShorts: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Gym Shorts';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="gym_shorts"
      asset="assets/locations/school/gym/shorts.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default GymShorts;
