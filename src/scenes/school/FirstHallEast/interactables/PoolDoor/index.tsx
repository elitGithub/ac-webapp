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

export const PoolDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Pool';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="pool_door"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/pool.webp"
        offset={{ x: 0, y: 33 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pool_sign.webp"
        offset={{ x: 15, y: 0 }}
      />
    </Interactable>
  );
};

export default PoolDoor;
