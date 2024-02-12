// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Stairs from './interactables/Stairs';
import WalkRight from './interactables/WalkRight';
import WalkLeft from './interactables/WalkLeft';

export const SceneFirstHall: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/first_hall/ceiling.webp"
      offset={{ x: 0, y: 0 }}
    >
      <Stairs id="stairs" offset={{ x: 1780, y: 610, z: 2 }} />

      <WalkRight
        id="walk_right"
        asset="assets/locations/school/first_hall/walk_right.webp"
        offset={{ x: 1534, y: 648, z: 0 }}
      />

      <WalkLeft
        id="walk_left"
        asset="assets/locations/school/first_hall/walk_left.webp"
        offset={{ x: 0, y: 657, z: 0 }}
      />

      <Static
        asset="assets/locations/school/first_hall/wall.webp"
        offset={{ x: 276, y: 172, z: 1 }}
      />
      <Static
        asset="assets/locations/school/first_hall/window.webp"
        offset={{ x: 492, y: 259, z: 1 }}
      />
      <Static
        asset="assets/locations/school/first_hall/lamps.webp"
        offset={{ x: 0, y: 33, z: 0 }}
      />
      <Static
        asset="assets/locations/school/first_hall/backpack.webp"
        offset={{ x: 1350, y: 789, z: 2 }}
      />
    </Scene>
  );
};

export default memo(SceneFirstHall);
