// Libraries
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Controller: React.FC<InteractableConfig> = ({ offset }) => {
  // Definitions
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  const controller_taken = useAppSelector(
    (state) => state.scene.home_bedroom.controller === 'taken'
  );

  return (
    <Interactable
      id="controller"
      asset="assets/locations/home/bedroom/controller.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!controller_taken}
    />
  );
};

export default Controller;
