// Libraries
import React, { useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import ExitArrow from './interactables/ExitArrow';
import WestHall from './interactables/West Hall';
import MainStairs from './interactables/MainStairs';
import HomeroomDoor from './interactables/HomeroomDoor';

export const SceneGroundFloor: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene background="" offset={{ x: -12, y: -119 }}>
      <ExitArrow offset={{ x: 933, y: 1000 }} />
      <HomeroomDoor offset={{ x: 483, y: 551, z: 2 }} />
      <WestHall offset={{ x: 450, y: 484 }} />

      <MainStairs offset={{ x: 741, y: 486 }} />

      <Static
        asset="assets/locations/school/ground_floor/background.webp"
        offset={{ x: -12, y: -119, z: 0 }}
      />
    </Scene>
  );
};

export default SceneGroundFloor;
