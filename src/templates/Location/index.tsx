// Libraries
import React, { useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
// TODO: Import interactables
// eg. import Jo from './interactables/Jo';

export const SceneLocation: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene background="path/to/background.webp" offset={{ x: 0, y: 0 }}>
      {/* TODO: Add interactables here */}
      {/* eg. <Jo offset={{ x: 678, y: 396 }} /> */}

      {/* TODO: Add statics here */}
      {/* eg. <Static asset="path/to/asset.webp" offset={{ x: 0, y: 0 }} /> */}
    </Scene>
  );
};

export default SceneLocation;
