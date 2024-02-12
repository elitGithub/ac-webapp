import React, { useContext } from 'react';

import './index.scss';
import { ScaleContext } from 'components/ScaleContext';

const HintScreen: React.FC = () => {

  const scale = useContext(ScaleContext);

  return (
    <div style={{ paddingTop: `${7 * scale }vh` }} className='hint-wrapper' >
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div> <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
      <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
       <div className='hint-image-bg'>
        <p className='frame-text-title' >Make a Wish and Blow</p>
        <p className='frame-text-description' >
        A good want and some rest. Doctor's orders.
        </p>
      </div>
    </div>
  );
};

export default HintScreen;
