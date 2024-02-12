import React, { useContext } from 'react';

import './index.scss';

interface ContactProps {
  onClick?: () => void;
}

const ContactScreen: React.FC<ContactProps> = ({ onClick }) => {

  return (
    <div className='contact-screen' >

      <div>asd</div>
    </div>
  );
};

export default ContactScreen;
