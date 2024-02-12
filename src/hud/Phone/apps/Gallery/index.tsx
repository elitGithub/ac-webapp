import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText'

const Gallery: React.FC<InteractableWithTextConfig> = ({ offset }) => {
  return (
    <>
      <InteractableWithText 
        id='gallery'
        asset='assets/phone/apps/replay/icon.webp'
        outerText={{
          title: 'Gallery'
        }}
        offset={offset}
        persist
        render={true}
      />
      
    </>
  )
}

export default Gallery