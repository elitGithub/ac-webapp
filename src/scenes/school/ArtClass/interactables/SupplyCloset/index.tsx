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

export const SupplyCloset: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useTitle();
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="supply_closet"
      //asset="assets/locations/school/art_class/supply_closet.webp"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/art_class/supply_closet.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Asset
        asset="assets/locations/school/art_class/paintings_supply_closet.webp"
        offset={{ x: 18, y: 50 }}
      />
    </Interactable>
  );
};

export default SupplyCloset;
