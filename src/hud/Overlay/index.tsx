import React, { useContext, useEffect, useState } from 'react'

import './index.scss';
import { closeOverlay } from 'state/features/display';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import classNames from 'classnames';
import { SequenceContext } from 'components/SequenceContext';
import { closeOverlaySequence } from './sequences';

// Black background overlay for hud. Ex. Phone, Inventory.
const Overlay: React.FC = () => {
  const { startSequence } = useContext(SequenceContext)
  const { phone, inventory, hideHUD } = useAppSelector( state => state.display.hud );

  // Define render and visible
  const [render, setRender] = useState<boolean>( !!phone.open || !!inventory.open);
  const [visible, setVisible] = useState<boolean>(false);

  // Set a delay to add fade effects
  useEffect( () => {
    if(phone.open || inventory.open) {
      setRender(true);
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setRender(false), 50);
      return () => clearTimeout(timeout);
    }

  }, [phone, inventory]);

  if(!render) null;
  
  const onClick = () => {
    console.log("overlay clicked")
    // Use sequence to close overlay to prevent Interactable events firing when closing the overlay.
    startSequence(closeOverlaySequence())
  }

  return (
    <div 
      onClick={() => visible && onClick() } 
      style={{
        background: 'rgba(0,0,0,0.4)'
      }}
      className={classNames('hud-overlay', { visible })}
    >
    </div>
  ) 
}

export default Overlay