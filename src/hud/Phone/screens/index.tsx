import React from 'react';
import './index.scss';

import Header from './Header';
import MessagesScreen from './Messages';
import HintScreen from './Hints';
import ContactScreen from './Contacts';

interface ScreenProps {
  title: string;
  navigate: React.Dispatch<React.SetStateAction <string> >;
}
// Messages color: #0ACC4D
const Screen: React.FC<ScreenProps> = ({ title, navigate }) => {

  const screen = () => {
    switch (title) {
      case 'hints':
        return <HintScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'contacts':
        return <ContactScreen />;
      default:
        return <div>No Screen Detected...</div>
    }
  }

  const onClick = () => {
    navigate('')
  }

  return (
    <div className='phone-screen' >
      <Header 
        title={title} 
        bgColor={ 
          title === 'messages' ? '#0ACC4D' : 
          title === 'contacts' ? '#B540FF' : 'white' 
        } 
        onClick={onClick}
      />
      
      {screen()}
    </div>
  );
};

export default Screen;
