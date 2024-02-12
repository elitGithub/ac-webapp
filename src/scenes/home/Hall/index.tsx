// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Scene from 'components/Scene';
import Stairs from './interactables/Stairs';
import Static from 'components/Static';
import Umbrella from './interactables/Umbrella';
import DoorBedroom from './interactables/DoorBedroom';
import DoorBathroom from './interactables/DoorBathroom';
import DoorFloraRoom from './interactables/DoorFloraRoom';

// Interactables

export const SceneHall: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene
      background="assets/locations/home/hall/homehall.webp"
      offset={{ x: 0, y: 0 }}
    >
      <Static
        asset="assets/locations/home/hall/umbrellas.webp"
        offset={{ x: 592, y: 457 }}
      />

      <Static
        asset="assets/locations/home/hall/redumbrella.webp"
        offset={{ x: 598, y: 448 }}
      />

      <DoorBedroom offset={{ x: 1512, y: 63, z: 2 }} />
      <Stairs offset={{ x: 86, y: 707 }} />
      <Umbrella offset={{ x: 624, y: 451 }} />
      <DoorBathroom offset={{ x:1328, y:235 }} />
      <DoorFloraRoom offset={{ x:928, y:288 }} />
    </Scene>
  );
};

export default memo(SceneHall);
