// Libraries
import React from 'react';

// Styles
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';
import { useDispatch } from 'react-redux';
import { togglePhone } from 'state/actions';

export const PhoneDisplay: React.FC<InteractableWithTextConfig> = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(togglePhone())
  }

  return (
      <InteractableWithText 
        id='phone_display'
        asset='assets/ui/hud/btn_phone.webp'
        hintText={{
          title: 'Phone'
        }}
        onClick={onClick}
        render
      />

  );
};

export default PhoneDisplay;
