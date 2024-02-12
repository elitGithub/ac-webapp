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

export const BathroomDoor: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Bathroom';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="bathroom_door"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/bathroom.webp"
        offset={{ x: 0, y: 65 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/board.webp"
        offset={{ x: 27, y: 143 }}
      />

      {false /* TODO: quest.maxine_wine["sports_wing_poster"] | Adding conditionals inside composite interactables doesn't seem to work properly? */ && (
        <Asset
          asset="assets/locations/school/first_hall_east/flora_poster.webp"
          offset={{ x: 47, y: 160 }}
        />
      )}

      <Asset
        asset="assets/locations/school/first_hall_east/bathroom_sign.webp"
        offset={{ x: 0, y: 0 }}
      />
    </Interactable>
  );
};

export default BathroomDoor;
