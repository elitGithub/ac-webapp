// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import ExitArrow from './interactables/ExitArrow';
import NurseDoor from './interactables/NurseDoor';

export const SceneGroundFloorWest: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/ground_floor_west/gfwhall.webp"
      offset={{ x: 0, y: 0 }}
    >
      <ExitArrow offset={{ x: 904, y: 921 }} />
      <NurseDoor offset={{ x: 0, y: 0 }} />
    </Scene>
  );
};

export default memo(SceneGroundFloorWest);
