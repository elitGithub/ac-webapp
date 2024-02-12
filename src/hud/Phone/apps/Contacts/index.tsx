import React from 'react'

import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText'

interface ContactsProps extends InteractableWithTextConfig {
  onClick?: () => void;
}

const Contacts: React.FC<ContactsProps> = ({ offset, onClick }) => {
  return (
    <>
      <InteractableWithText 
        id='contacts'
        asset='assets/phone/apps/contacts/icon.webp'
        outerText={{
          title: 'Contacts'
        }}
        offset={offset}
        persist
        onClick={onClick}
        render={true}
      />
      
    </>
  )
}

export default Contacts