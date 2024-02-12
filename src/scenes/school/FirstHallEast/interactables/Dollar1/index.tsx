// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';

export const Dollar1: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Money';
  const description = '';
  const action = useAction();
  const shouldRender = useAppSelector(
    (state) =>
      state.scene.school_first_hall_east.dollar1_spawned_today &&
      !state.scene.school_first_hall_east.dollar1_taken_today
  );

  return (
    <Interactable
      id="dollar1"
      asset="assets/locations/school/first_hall_east/dollar1.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender ?? false}
    />
  );
};

export default Dollar1;
