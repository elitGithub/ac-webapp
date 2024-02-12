// Libraries
import React from 'react'
import { useAppSelector } from 'state/hooks'

// Styles
import './index.scss';

// Actions
import { advance } from 'state/actions';

// Components
import Static from 'components/Static';

// Display
import ChoiceDisplay from './display/ChoiceDisplay';
import TextDisplay from './display/TextDisplay';
import MapDisplay from './display/MapDisplay';
import TimeDisplay from './display/TimeDisplay';
import EnergyBar from './display/EnergyBar';
import MoneyDisplay from './display/MoneyDisplay';
import QuestGuideDisplay from './display/QuestGuideDisplay';
import ModeDisplay from './display/ModeDisplay';
import InventoryDisplay from './display/InventoryDisplay';
import PhoneDisplay from './display/PhoneDIsplay';
import EyeDisplay from './display/EyeDisplay';
import Phone from './Phone';
import Overlay from './Overlay';
import Inventory from './Inventory';


// This will act as a wrapper for the whole hud files and ui.
// TODO: Add all the hud components here.
// Ex: <Phone /> <Inventory /> <Energy />
const Hud: React.FC = () => {
  const { scene, hud } = useAppSelector((state) => state.display);
  const { day, hour, energy } = useAppSelector((state) => state.time);

  return (
    <>
      { scene !== 'main_menu' && scene !== 'splash_screen' && 
        <>
          <EyeDisplay /> 
          <Phone />
          <Overlay />
          <ChoiceDisplay />

          {!hud.hideHUD && <TextDisplay />  }
        </>
      }

      {/* 
        * Avoid rendering HUD on splashscreen and main menu and intro
        */}
      { 
        scene !== 'main_menu' && 
        scene !== 'splash_screen' && 
        scene !== 'intro' &&
        !hud.hideHUD && 
        <>
    
          <Inventory />

          <Static asset='assets/ui/hud/top_gradient.webp' offset={{ x: 0, y: 0, z: 1 }} />
          

          <div className='top-ui-wrapper' >
            <div className="ui">
              <MapDisplay />
              <TimeDisplay />
              <EnergyBar current={energy} max={100} />
              <MoneyDisplay />
            </div>

            <div className='ui' >
              <QuestGuideDisplay />
              <ModeDisplay />
              <InventoryDisplay />
              <PhoneDisplay />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Hud