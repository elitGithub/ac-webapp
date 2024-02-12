// Libraries
import React from 'react';

// Styles
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';

export const ModeDisplay: React.FC<InteractableWithTextConfig> = () => {

  return (
      <InteractableWithText 
        id='mode_display'
        asset='assets/ui/hud/btn_game_mode.webp'
        innerText={{
          title: 'Mode: Explore',
          font: '2rem Fresca, Arial, sans-serif',
          textCenter: true
        }}
        hintText={{
          title: 'Change Mode To Fast'
        }}
        render={true}
        imageSize={{ width: 170 }}
      />

  );
};

export default ModeDisplay;
