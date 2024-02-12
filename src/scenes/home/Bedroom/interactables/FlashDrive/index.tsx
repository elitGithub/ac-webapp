// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';
import { useTitle } from './hooks/useTitle';

export const FlashDrive: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="flash-drive"
      asset="assets/locations/home/bedroom/flash_drive.webp"
      nameplate={{ title, description, offset: { x: -170, y: -120 } }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default FlashDrive;
