// Libraries
import React, { memo, useEffect } from 'react';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Bookshelf from './interactables/Bookshelf';
import DoorArt from './interactables/DoorArt';
import DoorEnglish from './interactables/DoorEnglish';
import DoorLibrary from './interactables/DoorLibrary';
import DoorMusic from './interactables/DoorMusic';
import ExitArrow from './interactables/ExitArrow';
import MrsL from './interactables/MrsL';
import Kate from './interactables/Kate';
import Isabelle from './interactables/Isabelle';

// TODO: Import interactables
// eg. import Jo from './interactables/Jo';

export const SceneFirstHallWest: React.FC = () => {
  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/first_hall_west/1fwcorridor.webp"
      offset={{ x: 0, y: 0 }}
    >
      <ExitArrow offset={{ x: 904, y: 921, z: 0 }} />
      <DoorLibrary offset={{ x: 845, y: 232, z: 0 }} />
      <DoorMusic offset={{ x: 646, y: 227, z: 0 }} />
      <DoorEnglish offset={{ x: 405, y: 136, z: 0 }} />
      <DoorArt offset={{ x: 0, y: 12, z: 0 }} />
      <Bookshelf offset={{ x: 1215, y: 294, z: 0 }} />
      <MrsL offset={{ x: 686, y: 290 }} />
      <Kate offset={{ x: 1149, y: 253 }} />
      <Isabelle offset={{ x: 1395, y: 283 }} />

      <Static
        asset="assets/locations/school/first_hall_west/paintings.webp"
        offset={{ x: 526, y: 227 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/headmistress.webp"
        offset={{ x: 1084, y: 270 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/ria_painting.webp"
        offset={{ x: 234, y: 134 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/mrsl_painting.webp"
        offset={{ x: 209, y: 371 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/easel.webp"
        offset={{ x: 1129, y: 319 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/stool.webp"
        offset={{ x: 1106, y: 495 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/cello.webp"
        offset={{ x: 580, y: 347 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/cello_box.webp"
        offset={{ x: 525, y: 340 }}
      />

      <Static
        asset="assets/locations/school/first_hall_west/books.webp"
        offset={{ x: 1220, y: 312 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/sofa_back.webp"
        offset={{ x: 1240, y: 481 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/table.webp"
        offset={{ x: 1330, y: 569 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/pot.webp"
        offset={{ x: 1369, y: 482 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/piano.webp"
        offset={{ x: 1531, y: 183, z: 5 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/piano_stool.webp"
        offset={{ x: 1450, y: 804, z: 5 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/far_cat.webp"
        offset={{ x: 1082, y: 626 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy11.webp"
        offset={{ x: 1132, y: 1016 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy10.webp"
        offset={{ x: 1067, y: 947 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy9.webp"
        offset={{ x: 1043, y: 889 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy8.webp"
        offset={{ x: 994, y: 814 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy7.webp"
        offset={{ x: 906, y: 799 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy6.webp"
        offset={{ x: 797, y: 838 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy5.webp"
        offset={{ x: 728, y: 898 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy4.webp"
        offset={{ x: 558, y: 887 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy3.webp"
        offset={{ x: 402, y: 874 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy2.webp"
        offset={{ x: 274, y: 898 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/candy1.webp"
        offset={{ x: 141, y: 950 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/dollar3.webp"
        offset={{ x: 1792, y: 439 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/dollar2.webp"
        offset={{ x: 1368, y: 501 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/dollar1.webp"
        offset={{ x: 858, y: 524 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/book.webp"
        offset={{ x: 1251, y: 284 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/magnet.webp"
        offset={{ x: 570, y: 798 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/chopin_music_score.webp"
        offset={{ x: 1793, y: 507 }}
      />
      <Static
        asset="assets/locations/school/first_hall_west/close_cat.webp"
        offset={{ x: 1303, y: 792, z: 5 }}
      />
    </Scene>
  );
};

export default memo(SceneFirstHallWest);
