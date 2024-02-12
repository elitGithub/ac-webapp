// Libraries
import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { dayName } from 'state/features/time';

// Actions
import { advance } from 'state/actions';


// Styles
import InteractableWithText from 'components/InteractableWithText';

export const MapDisplay: React.FC = () => { 
  const sceneTitle = useAppSelector(state => state.display.sceneTitle)

  return (
    <InteractableWithText 
      id='map_display'
      asset='assets/ui/hud/btn_map.webp'
      innerText={{
        title: sceneTitle ?? '',
        font: '2rem Fresca, Arial, sans-serif',
        offset: { x: 80, y: 30 }
      }}
      imageSize={{ width: 220 }}
      interactable={false}
      render={true}
    />
  );
};

export default MapDisplay;
