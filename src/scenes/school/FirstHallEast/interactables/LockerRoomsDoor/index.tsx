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

export const LockerRoomsDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Locker Rooms';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="locker_rooms_door"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/locker_door.webp"
        offset={{ x: 0, y: 105 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/poster.webp"
        offset={{ x: 57, y: 297 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/locker_sign.webp"
        offset={{ x: 40, y: 0 }}
      />
    </Interactable>
  );
};

export default LockerRoomsDoor;
