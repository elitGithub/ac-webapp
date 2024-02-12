import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';

interface HintProps extends InteractableWithTextConfig {
  onClick?: () => void;
}

const Hint: React.FC<HintProps> = ({ offset, onClick }) => {

  return (
    <>
      <InteractableWithText 
        id='hints'
        asset='assets/phone/apps/hints/icon.webp'
        outerText={{
          title: 'Hints'
        }}
        offset={offset}
        onClick={onClick}
        persist
        render={true}
      />
      
    </>
  )
}

export default Hint