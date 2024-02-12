// Libraries
import React from 'react';

// Styles
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';

export const QuestGuideDisplay: React.FC<InteractableWithTextConfig> = () => {


  return (
      <InteractableWithText 
        id='quest_guide_display'
        asset='assets/ui/hud/btn_time.webp'
        innerText={{
          title: 'Quest Guide: Stepping on the Rose',
          font: '1.7rem Fresca, Arial, sans-serif',
          textCenter: true
        }}
        hintText={{
          title: 'Change Quest Guide'
        }}
        render={true}
        imageSize={{ width: 270 }}
      />

  );
};

export default QuestGuideDisplay;
