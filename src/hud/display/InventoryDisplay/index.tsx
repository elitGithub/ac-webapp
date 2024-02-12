// Libraries
import React from 'react';

// Styles
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';
import { useDispatch } from 'react-redux';
import { toggleInventory } from 'state/actions';

export const InventoryDisplay: React.FC<InteractableWithTextConfig> = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(toggleInventory())
  }

  return (
      <InteractableWithText 
        id='inventory_display'
        asset='assets/ui/hud/btn_inventory.webp'
        hintText={{
          title: 'inventory'
        }}
        onClick={onClick}
        render={true}
      />

  );
};

export default InventoryDisplay;
