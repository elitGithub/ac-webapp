// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const Magnet: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Magnet';
  const description = useDescription();
  const action = useAction();
  const shouldRender = useAppSelector((state) => state.scene.school_gym.magnet);

  return (
    <Interactable
      id="magnet"
      asset="assets/locations/school/gym/magnet.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={shouldRender ?? false}
    />
  );
};

export default Magnet;
