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

export const DoorEnglish: React.FC<InteractableConfig> = ({
  id = 'door_english',
  asset = '',
  offset,
}) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id={id}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_west/english.webp"
        offset={{ x: 0, y: 128 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_west/english_sign.webp"
        offset={{ x: 6, y: 0 }}
      />
    </Interactable>
  );
};

export default DoorEnglish;
