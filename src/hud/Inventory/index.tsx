import React, { useContext } from 'react'
import './index.scss'
import classNames from 'classnames'
import InteractableWithText from 'components/InteractableWithText'
import { ScaleContext } from 'components/ScaleContext'
import { useAppSelector } from 'state/hooks'

const Inventory= () => {
  const { open } = useAppSelector( state => state.display.hud.inventory )
  const scale = useContext(ScaleContext);


  return !open ? null : (
    <div className={classNames('inventory-wrapper')} >
      <InteractableWithText 
        id='inventory-title'
        asset='assets/ui/inventory/frame_title.webp'
        innerText={{
          title: 'Inventory',
          font: '5rem Fresca, Arial, sans-serif',
          offset: { x: 170, y: 65 }
        }}
        interactable={false}
        render
      />
      
      <div className='inventory-bg' >
        <InteractableWithText
          id='inventory-bg' 
          asset='assets/ui/inventory/bg.webp'
          imageSize={{ width: 1480, height: 900 }}
          offset={{ x: -500, y: 20 }}
          interactable={false}
          render
        />
        <div 
          style={{
            top: 80 * scale,
            left: -350 * scale,
          }}
          className={classNames('inventory-items')}
        >
          {/* <InteractableWithText
            id='inventory-empty' 
            asset='assets/ui/inventory/item_bg.webp' 
            imageSize={{ width: 200, height: 150 }}
            // offset={{ x: -350, y: 80 }}
            interactable={false}
            render
          />
          <InteractableWithText
            id='inventory-empty' 
            asset='assets/ui/inventory/item_bg.webp' 
            imageSize={{ width: 200, height: 150 }}
            // offset={{ x: -350, y: 80 }}
            interactable={false}
            render
          />
          <InteractableWithText
            id='inventory-empty' 
            asset='assets/ui/inventory/item_bg.webp' 
            imageSize={{ width: 200, height: 150 }}
            // offset={{ x: -350, y: 80 }}
            interactable={false}
            render
          />
          <InteractableWithText
            id='inventory-empty' 
            asset='assets/ui/inventory/item_bg.webp' 
            imageSize={{ width: 200, height: 150 }}
            // offset={{ x: -350, y: 80 }}
            interactable={false}
            render
          /> */}
          {/* <InteractableWithText
            id='inventory-empty' 
            asset='assets/ui/inventory/item_bg.webp' 
            imageSize={{ width: 200, height: 280 }}
            offset={{ x: -400, y: 180 }}
            interactable={false}
            render
          /> */}
        </div>
      </div>



    </div>
  )
}

export default Inventory