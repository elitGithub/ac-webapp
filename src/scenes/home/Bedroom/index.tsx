// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Alarm from './interactables/Alarm';
import Bed from './interactables/Bed';
import Closet from './interactables/Closet';
import Computer from './interactables/Computer';
import Controller from './interactables/Controller';
import Door from './interactables/Door';
import FlashDrive from './interactables/FlashDrive';

export const SceneBedroom: React.FC = () => {
  const { alarm } = useAppSelector((state) => ({
    alarm: state.scene.home_bedroom.alarm,
  }));

  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene
      background="assets/locations/home/bedroom/bedroom.webp"
      offset={{ x: 0, y: -50 }}
    >
      <Closet offset={{ x: 943, y: 332, z: 0 }} />
      <Door offset={{ x: 735, y: 445 }} />

      <Static
        asset="assets/locations/home/bedroom/carpet.webp"
        offset={{ x: 255, y: 742 }}
      />

      <Static
        asset="assets/locations/home/bedroom/bookshelve_left.webp"
        offset={{ x: 135, y: 359 }}
      />

      <Bed offset={{ x: 315, y: 539 }} />

      <Static
        asset="assets/locations/home/bedroom/tv.webp"
        offset={{ x: 148, y: 630, z: 1 }}
      />

      <Controller offset={{ x: 280, y: 726 }} />
      <Alarm
        offset={
          alarm?.startsWith('smashed') ? { x: 306, y: 698 } : { x: 305, y: 704 }
        }
      />

      <Static
        asset="assets/locations/home/bedroom/drawers.webp"
        offset={{ x: 1420, y: 658 }}
      />

      <Static
        asset="assets/locations/home/bedroom/bookshelves_right.webp"
        offset={{ x: 1330, y: 32 }}
      />

      <Static
        asset="assets/locations/home/bedroom/desk.webp"
        offset={{ x: 1060, y: 564 }}
      />

      <Static
        asset="assets/locations/home/bedroom/statuettes.webp"
        offset={{ x: 1534, y: 469 }}
      />
      <FlashDrive offset={{ x: 1511, y: 650 }} />

      <Computer offset={{ x: 1143, y: 485 }} />
    </Scene>
  );
};

export default memo(SceneBedroom);
