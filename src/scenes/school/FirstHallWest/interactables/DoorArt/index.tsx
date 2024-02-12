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

export const DoorArt: React.FC<InteractableConfig> = ({
  asset = '',
  offset,
}) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="door_art"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_west/art.webp"
        offset={{ x: 0, y: 182 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_west/art_sign.webp"
        offset={{ x: 0, y: 0 }}
      />
    </Interactable>
  );
};

export default DoorArt;
