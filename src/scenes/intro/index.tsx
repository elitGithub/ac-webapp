// Libraries
import React, { useContext, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import SkipButton from './Interactable';
import { SequenceContext } from 'components/SequenceContext';
import { introStart } from './sequences/index';

export const Intro = () => {
  const { startSequence } = useContext(SequenceContext);

  useEffect(() => {
    // Start intro sequence
    
    const timeout = setTimeout( () => {
      startSequence(introStart())

    }, 2000)

    return () => {
      // On exit

      clearTimeout(timeout)
    };
  }, []);

  return (
    <Scene background="assets/intro/bg.webp" offset={{ x: 0, y: 0 }}>
      {/* <SkipButton offset={{ x: 50, y: 50 }} /> */}
    </Scene>
  );
};
