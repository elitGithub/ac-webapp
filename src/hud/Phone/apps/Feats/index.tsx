import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText'

const Feats: React.FC<InteractableWithTextConfig> = ({ offset }) => {
  return (
    <>
      <InteractableWithText 
        id='feats'
        asset='assets/phone/apps/achievements/icon.webp'
        outerText={{
          title: 'Feats'
        }}
        offset={offset}
        persist
        render={true}
      />
      
    </>
  )
}

export default Feats