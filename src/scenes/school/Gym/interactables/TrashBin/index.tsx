// Libraries
import React from 'react';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const TrashBin: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Trash Bin';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="trash_bin"
      asset="assets/locations/school/gym/bin.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    />
  );
};

export default TrashBin;
