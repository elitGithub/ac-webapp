import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText'

interface MessagesProps extends InteractableWithTextConfig {
  onClick?: () => void;
}

const Messages: React.FC<MessagesProps> = ({ offset, onClick }) => {
  return (
    <>
      <InteractableWithText 
        id='messages'
        asset='assets/phone/apps/messages/icon.webp'
        outerText={{
          title: 'Messages'
        }}
        offset={offset}
        persist
        onClick={onClick}
        render={true}
      />
      
    </>
  )
}

export default Messages