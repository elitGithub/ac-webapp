// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';

export const Dollar2: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Money';
  const description = '';
  const action = useAction();
  const shouldRender = useAppSelector(
    (state) =>
      state.scene.school_gym.dollar2_spawned_today &&
      !state.scene.school_gym.dollar2_taken_today
  );

  return (
    <Interactable
      id="dollar2"
      asset="assets/locations/school/gym/dollar2.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender ?? false}
    />
  );
};

export default Dollar2;
