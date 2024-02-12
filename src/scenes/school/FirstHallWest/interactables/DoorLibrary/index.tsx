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
import { useTitle } from './hooks/useTitle';

export const DoorLibrary: React.FC<InteractableConfig> = ({
  id = 'door_library',
  asset = '',
  offset,
}) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id={id}
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_west/library.webp"
        offset={{ x: 0, y: 56 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_west/library_sign.webp"
        offset={{ x: 61, y: 0 }}
      />
    </Interactable>
  );
};

export default DoorLibrary;
