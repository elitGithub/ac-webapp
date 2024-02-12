// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';
import BathroomDoor from './interactables/BathroomDoor';




export const SceneBathroom: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene background="assets/locations/home/bathroom/bathroom.webp" offset={{  x: 0, y: 0  }}>
      {/* TODO: Add interactables here */}
       <BathroomDoor offset={{ x: 340, y: 69 }} />




    </Scene>
  );
};

export default memo(SceneBathroom);
