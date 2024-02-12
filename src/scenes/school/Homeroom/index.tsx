// Libraries
import React, { useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';
import Door from './interactables/Door';

// Interactables
//import BusStop from './interactables/BusStop';
//import Door from './interactables/Door';
//import Path from './interactables/Path';

export const SceneHomeroom: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/homeroom/sky.webp"
      offset={{ x: -12, y: -19 }}
    >
      <Static 
        asset="assets/locations/school/homeroom/blackboard.webp"
        offset={{
          x: 730,
          y: 440,
        }}
      />
      <Door offset={{
        x: 1400,
        y: 500
      }} />
    </Scene>
  );
};

export default SceneHomeroom;

//<BusStop offset={{ x: 1510, y: 627 }} />
//<Door offset={{ x: 890, y: 696 }} />
//<Path offset={{ x: 6, y: 685 }} />
