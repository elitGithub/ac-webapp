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

export const TrophyCase: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Trophy Case';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="trophy_case"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/trophycase.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/trophies.webp"
        offset={{ x: 219, y: 75 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/glass.webp"
        offset={{ x: 221, y: 39 }}
      />
    </Interactable>
  );
};

export default TrophyCase;
