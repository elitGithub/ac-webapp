import React, { useContext } from 'react';

import InteractableWithText, {
  InteractableWithTextConfig,
} from 'components/InteractableWithText';

import './index.scss';
import { ScaleContext } from 'components/ScaleContext';
import Static from 'components/Static';

interface ScreenHeaderProps extends InteractableWithTextConfig {
  title: string;
  bgColor?: string;
  onClick?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, bgColor, onClick }) => {
  const scale = useContext(ScaleContext);

  return (
    <>
      <div 
        style={{ 
          backgroundColor: bgColor ? bgColor : 'white',
          height: `${7 * scale}vh`
        }} 
        className='phone-header-wrapper'
      >
        <div className='phone-header' >
          <InteractableWithText 
            id='phone-back-button'
            asset='assets/phone/apps/return_alt.webp'
            imageSize={{
              width: 40,
              height: 40
            }}
            onClick={onClick}
            persist
            render
          />

          <p className='phone-header-title' >{title}</p>
        </div>
        
        { title === 'messages' && 
          <div className='phone-header' >
            <div className='contact-details' >
              <p className='contact-name' >Flora</p>
              <p className='contact-number'>+63 098 458 4635</p>
            </div>
            
            <div className='contact-image-missing' >
              ?
            </div>
            {/* <img 
              src='assets/characters/flora/contact_icon.webp' 
              alt='icon' 
              style={{ width: 50 * scale }}
            /> */}
          </div>
        }
      </div>

      {/* Box shadow for phone header */}
      {/* <div className='phone-header-shadow' /> */}

    </>
  );
};

export default ScreenHeader;
