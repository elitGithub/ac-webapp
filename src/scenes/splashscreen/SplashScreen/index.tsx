// Libraries
import React, { useContext, useEffect, useState } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';
import { useAction } from './hooks/useAction';
import { SequenceContext } from 'components/SequenceContext';

export const SceneSplashScreen: React.FC = () => {
  const [position, setPosition] = useState<number>(0);
  const action = useAction();
  const { startSequence } = useContext(SequenceContext);
  
  useEffect(() => {
    // On enter
    const a = setTimeout( () => {
      setPosition(75)
      setTimeout( () => {
        startSequence(action);
      }, 2000)
    }, 2000)

    return () => {
      // On exit
      clearTimeout(a)
    };
  }, []);

  return (
    <Scene background="assets/ui/splashscreen/studio_logo_bg.webp" offset={{ x: 0, y: 0 }}>
      <div style={{ position: 'absolute', bottom: `${position}%`, left: window.innerWidth/2/2, transition: 'bottom 1000ms ease-in', transformOrigin: 'center' }} >
        <Static asset='assets/ui/splashscreen/studio_logo.webp' offset={{ x: 0, y: 0 }} />
      </div>

      {/* 
        Until there's a workaround on preloading font family Fresca, don't remove this.
      */}
      <div style={{ position: 'absolute', left: '-123vw', fontFamily: 'Fresca' }}>
        asd
      </div>

    </Scene>
  );
};

export default SceneSplashScreen;
