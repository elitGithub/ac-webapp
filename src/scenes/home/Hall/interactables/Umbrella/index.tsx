// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const Umbrella: React.FC<InteractableConfig> = ({ offset }) => {
  const { umbrella_taken } = useAppSelector((state) => state.scene.home_hall);

  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="umbrella"
      asset="assets/locations/home/hall/blackumbrella.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={!umbrella_taken ?? false}
    />
  );
};

export default Umbrella;
