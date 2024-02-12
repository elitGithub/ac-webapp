// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Door from './interactables/Door';
import Nurse from './interactables/Nurse';

export const SceneLocation: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene
      background="assets/locations/school/nurse_room/nurse_wall.webp"
      offset={{ x: 0, y: 0 }}
    >
      {/* TODO: Add interactables here */}
      <Door offset={{ x: 1811, y: 180 }} />
      <Nurse offset={{ x: 914, y: 425 }} />

      <Static
        asset="assets/locations/school/nurse_room/stool.webp"
        offset={{
          x: 891,
          y: 901,
        }}
      />
    </Scene>
  );
};

export default memo(SceneLocation);
