// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import JoCoffee from './interactables/JoCoffee';
import JoNews from './interactables/JoNews';
import Stairs from './interactables/Stairs';
import GigglyPuffPackage from './interactables/GigglypuffPackage';
import Door from './interactables/Door';

export const SceneKitchen: React.FC = () => {
  const packageArrived = useAppSelector(
    (state) =>
      state.quest.potted_weeds.phase === 'package' &&
      (state.quest.potted_weeds.package_days ?? 0) >= 2
  );

  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene
      background="assets/locations/home/kitchen/kitchen.webp"
      offset={{ x: 0, y: 0 }}
    >
      <Door offset={{ x: 175, y: 197 }} />
      <JoCoffee offset={{ x: 787, y: 359 }} />
      <JoNews offset={{ x: 678, y: 396 }} />
      <Stairs offset={{ x: 0, y: 0 }} />
      {packageArrived && <GigglyPuffPackage offset={{ x: 394, y: 516 }} />}
    </Scene>
  );
};

export default memo(SceneKitchen);
