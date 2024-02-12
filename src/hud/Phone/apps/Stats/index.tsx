import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText'

const Stats: React.FC<InteractableWithTextConfig> = ({ offset }) => {
  return (
    <>
      <InteractableWithText 
        id='stats'
        asset='assets/phone/apps/stats/icon.webp'
        outerText={{
          title: 'Stats'
        }}
        offset={offset}
        persist
        render={true}
      />
      
    </>
  )
}

export default Stats