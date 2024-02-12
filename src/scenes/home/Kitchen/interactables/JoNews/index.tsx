// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Interactable, { InteractableConfig } from 'components/Interactable';

// Definitions
import { useAction, useRender } from 'characters/Jo/hooks';

export const JoNews: React.FC<InteractableConfig> = ({ offset }) => {
  const title = useAppSelector((state) => state.character.jo.name);
  const description = '';
  const action = useAction();

  // Determine interactable asset based on xray state
  const asset = useAppSelector((state) => {
    switch (state.display.xray) {
      case 'full':
        return 'assets/locations/home/kitchen/xray_full/momnews_xray_full.webp';
      case 'partial':
        return 'assets/locations/home/kitchen/momnews_xray.webp';
      case 'off':
        return 'assets/locations/home/kitchen/momnews.webp';
    }
  });

  // Determine if interactable should be rendered
  const isReading = useAppSelector(
    (state) => state.character.jo.activity === 'reading'
  );
  const render = useRender(() => {
    if (!isReading) return false;

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

export default JoNews;
