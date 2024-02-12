// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { set } from 'state/actions';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Balls from './interactables/Balls';
import BasketballHoop from './interactables/BasketballHoop';
import Bleachers from './interactables/Bleachers';
import Book from './interactables/Book';
import BrokenLight from './interactables/BrokenLight';
import Dollar1 from './interactables/Dollar1';
import Dollar2 from './interactables/Dollar2';
import ExitDoor from './interactables/ExitDoor';
import GymShorts from './interactables/GymShorts';
import HulaHoop from './interactables/HulaHoop';
import Isabelle from './interactables/Isabelle';
import KiddiePool from './interactables/KiddiePool';
import Ladder from './interactables/Ladder';
import LeftDoor from './interactables/LeftDoor';
import Light from './interactables/Light';
import Magnet from './interactables/Magnet';
import MrsL from './interactables/MrsL';
import PingPongPaddle from './interactables/PingPongPaddle';
import SignUpList from './interactables/SignUpList';
import TrashBin from './interactables/TrashBin';
import VendingMachine from './interactables/VendingMachine';
import VolleyballNet from './interactables/VolleyballNet';
import Windows from './interactables/Windows';

export const SceneGym: React.FC = () => {
  const scene = useAppSelector((state) => state.scene.school_gym);
  const { hour } = useAppSelector((state) => state.time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // On enter
    if (true) {
      /* TODO: school_gym.first_visit_today */
      dispatch(
        set({
          scene: 'school_gym',
          dollar1_spawned_today: Math.random() < 0.25,
          dollar2_spawned_today: Math.random() < 0.25,
        })
      );
    }
    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene background="" offset={{ x: 0, y: 0 }}>
      <Static
        asset="assets/locations/school/gym/gym.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Bleachers offset={{ x: 0, y: 349 }} />
      <Windows offset={{ x: 0, y: 203 }} />
      <Static
        asset="assets/locations/school/gym/scoreboard.webp"
        offset={{ x: 388, y: 247 }}
      />
      <Static
        asset="assets/locations/school/gym/fence.webp"
        offset={{ x: 0, y: 259, z: 1 }}
      />
      <LeftDoor offset={{ x: 156, y: 477 }} />
      <ExitDoor offset={{ x: 1057, y: 271 }} />
      <SignUpList offset={{ x: 237, y: 531 }} />
      <TrashBin offset={{ x: 93, y: 591 }} />
      <VendingMachine offset={{ x: 0, y: 515 }} />

      <Ladder offset={{ x: 1472, y: 364 }} />

      <Static
        asset="assets/locations/school/gym/backboard_top.webp"
        offset={{ x: 1617, y: 0 }}
      />
      <BasketballHoop offset={{ x: 1739, y: 75 }} />
      <Static
        asset="assets/locations/school/gym/ring_left.webp"
        offset={{ x: 106, y: 0 }}
      />
      <VolleyballNet offset={{ x: 937, y: 473 }} />
      <HulaHoop offset={{ x: 17, y: 875 }} />
      <Balls offset={{ x: 67, y: 629 }} />

      {/* TODO: <Nurse offset={{ x: 1506, y: 463 }} /> */}

      <Static
        asset="assets/locations/school/gym/table.webp"
        offset={{ x: 1445, y: 768 }}
      />

      <KiddiePool offset={{ x: 427, y: 676 }} />

      <GymShorts offset={{ x: 1593, y: 814 }} />
      <PingPongPaddle offset={{ x: 1725, y: 813 }} />

      {scene.light_smashed ? (
        <BrokenLight offset={{ x: 843, y: 55 }} />
      ) : (
        <Light offset={{ x: 843, y: 57 }} />
      )}

      {/* TODO: <Kate offset={{ x: 1263, y: 467 }} /> */}

      <Isabelle offset={{ x: 253, y: 505 }} />

      {/* TODO: <Lindsey offset={{ x: 737, y: 497 }} /> */}

      <MrsL offset={{ x: 522, y: 474 }} />

      {/* TODO: <Maxine offset={{ x: 468, y: 515 }} /> */}

      <Dollar1 offset={{ x: 132, y: 686 }} />
      <Dollar2 offset={{ x: 1859, y: 822 }} />
      <Book offset={{ x: 1824, y: 741 }} />

      <Magnet offset={{ x: 171, y: 767 }} />

      {(hour < 7 || hour > 18) && (
        <>
          <Static
            asset="assets/locations/school/gym/dark_overlay.webp"
            offset={{ x: 0, y: 0, z: 1 }}
          />
          <Static
            asset="assets/locations/school/gym/lightsoff.webp"
            offset={{ x: 158, y: 33, z: 1 }}
          />
        </>
      )}
    </Scene>
  );
};

export default memo(SceneGym);
