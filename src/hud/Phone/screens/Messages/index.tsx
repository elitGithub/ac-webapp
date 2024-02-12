import React, { useContext } from 'react';

import InteractableWithText, {
  InteractableWithTextConfig,
} from 'components/InteractableWithText';

import './index.scss';
import ScreenHeader from '../Header';
import { ScaleContext } from 'components/ScaleContext';

// Messages color: #0ACC4D

interface MessagesProps {
  onClick?: () => void;
}

const MessagesScreen: React.FC<MessagesProps> = ({ onClick }) => {
  const scale = useContext(ScaleContext);

  return (
    <div className='messages-screen' >
      {/* <ScreenHeader title='Messages' bgColor='#0ACC4D' onClick={onClick} /> */}


      <div className='messages-sender' >

        <div>
          asd
        </div>

        <div className='sender-icon' >
          <InteractableWithText 
            id='send-icon'
            asset='assets/phone/apps/messages/send_icon.webp'
            imageSize={{ width: 45, height: 45 }}
            render
          />
        </div>
        {/* <img 
          src='assets/phone/apps/messages/send_icon.webp' 
          alt='send-icon' 
          style={{ width: 80 * scale }}
        /> */}
      </div>
    </div>
  );
};

export default MessagesScreen;
