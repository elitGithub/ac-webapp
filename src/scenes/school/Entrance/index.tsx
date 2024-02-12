// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import BusStop from './interactables/BusStop';
import Door from './interactables/Door';
import Path from './interactables/Path';

export const SceneEntrance: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/entrance/school.webp"
      offset={{ x: 0, y: 0 }}
    >
      <BusStop offset={{ x: 1510, y: 627 }} />
      <Door offset={{ x: 890, y: 696 }} />
      <Path offset={{ x: 6, y: 685 }} />
    </Scene>
  );
};

export default memo(SceneEntrance);
