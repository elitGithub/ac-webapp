import React, { useEffect } from 'react';

import classNames from 'classnames';
import InteractableWithText from 'components/InteractableWithText';
import './index.scss';
import Hints from './apps/Hints';
import Stats from './apps/Stats';
import Messages from './apps/Messages';
import Contacts from './apps/Contacts';
import Feats from './apps/Feats';
import Gallery from './apps/Gallery';
import { useAppSelector } from 'state/hooks';
import HintScreen from './screens/Hints';
import Static from 'components/Static';
import MessagesScreen from './screens/Messages';
import ContactScreen from './screens/Contacts';
import Screen from './screens';

const Phone: React.FC = () => {
  const { open } = useAppSelector((state) => state.display.hud.phone);

  const [openApp, setOpenApp] = React.useState('');

  useEffect( () => {

  }, [])

  // Reset the phone state after closed
  useEffect( () => {
    if(!open) {
      // Added a delay to keep the phone animation sync with resetting phone.
      const timeout = setTimeout( () => {
        setOpenApp('')
      }, 300)

      return () => clearTimeout(timeout);
    }
  }, [open])

  return (
    <div
      style={{
        top: open ? '3.5%' : '100%',
        left: '50%'

      }}
      className={classNames('phone-wrapper')}
    >
      <InteractableWithText
        id="phone-bg"
        asset="assets/phone/bg.webp"
        interactable={false}
        render={true}
      />
      <InteractableWithText
        id="phone-app-bg"
        asset="assets/phone/app_bg.jpg"
        offset={{ x: 30, y: 148 }}
        interactable={false}
        render
      >
        {openApp !== '' && <Screen title={openApp} navigate={setOpenApp} />}
      </InteractableWithText>

      {openApp === '' && (
        <div>
          <Hints 
            offset={{ x: 50, y: 180 }} 
            onClick={() => setOpenApp('hints')}
          />
          <Stats 
            offset={{ x: 205, y: 180 }} 
            
          />
          <Messages
            offset={{ x: 355, y: 180 }}
            onClick={() => setOpenApp('messages')}
          />

          <Contacts 
            offset={{ x: 50, y: 350 }}  
            onClick={() => setOpenApp('contacts')}
          />
          <Feats offset={{ x: 205, y: 350 }} />
          <Gallery offset={{ x: 355, y: 350 }} />
        </div>
      )}
    </div>
  );
};

export default Phone;
