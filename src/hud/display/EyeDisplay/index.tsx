import InteractableWithText from 'components/InteractableWithText'
import React from 'react'
import { toggleHideHUD } from 'state/actions';
import { useAppDispatch, useAppSelector } from 'state/hooks'

const EyeDisplay: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hideHUD } = useAppSelector( state => state.display.hud );
  

  const onClick = () => dispatch(toggleHideHUD())


  return (
    <>
      <InteractableWithText 
        id='show-hide-hud'
        asset='assets/ui/hud/eye_open.webp'
        offset={{ x: 40, y: 1000, z: 300 }}
        hintText={{
          title: `${hideHUD ? 'Show' : 'Hide'} HUD`,
          offset: { x: 60, y: -2 },
          noWrap: true
        }}
        onClick={onClick}
        persist
        render
      />
    </>
  )
}

export default EyeDisplay