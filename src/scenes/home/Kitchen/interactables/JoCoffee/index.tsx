// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction, useRender } from 'characters/Jo/hooks';

export const JoCoffee: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.jo.name);
  const description = '';
  const action = useAction();

  // Determine interactable asset based on xray state
  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/home/kitchen/xray_full/momcoffee_xray_full.webp';
      case 'partial':
        return 'assets/locations/home/kitchen/momcoffee_xray.webp';
      case 'off':
        return 'assets/locations/home/kitchen/momcoffee.webp';
    }
  });

  // Determine if interactable should be rendered
  const isStanding = useAppSelector(
    (state) => state.character.jo.activity === 'standing'
  );
  const render = useRender(() => {
    if (!isStanding) return false;

    return true;
  });

  return (
    <Interactable
      id="jo"
      asset={asset}
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={render}
    />
  );
};

export default JoCoffee;
