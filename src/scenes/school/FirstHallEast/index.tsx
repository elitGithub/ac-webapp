// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { set } from 'state/actions';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import BathroomDoor from './interactables/BathroomDoor';
import Book from './interactables/Book';
import BulletinBoard from './interactables/BulletinBoard';
import Dollar1 from './interactables/Dollar1';
import Dollar2 from './interactables/Dollar2';
import Dollar3 from './interactables/Dollar3';
import ExitArrow from './interactables/ExitArrow';
import FootballTrophy from './interactables/FootballTrophy';
import GymDoor from './interactables/GymDoor';
import LockerRoomsDoor from './interactables/LockerRoomsDoor';
import PileOfShoes from './interactables/PileOfShoes';
import PoolDoor from './interactables/PoolDoor';
import Shoes from './interactables/Shoes';
import SwimTeamPhotos from './interactables/SwimTeamPhotos';
import TrophyCase from './interactables/TrophyCase';
import Vent from './interactables/Vent';
import VentAjar from './interactables/VentAjar';

export const SceneFirstHallEast: React.FC = () => {
  const scene = useAppSelector((state) => state.scene.school_first_hall_east);
  const { hour } = useAppSelector((state) => state.time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // On enter
    if (true) {
      /* TODO: school_first_hall_east.first_visit_today */
      dispatch(
        set({
          scene: 'school_first_hall_east',
          dollar1_spawned_today: Math.random() < 0.25,
          dollar2_spawned_today: Math.random() < 0.25,
          dollar3_spawned_today: Math.random() < 0.25,
        })
      );
    }
    return () => {
      // On exit
      dispatch(
        set({
          scene: 'school_first_hall_east',
          shoe1_moved: false,
          shoe2_moved: false,
          shoe3_moved: false,
          shoe4_moved: false,
          shoe5_moved: false,
          shoe6_moved: false,
          shoe7_moved: false,
          shoe8_moved: false,
          shoe9_moved: false,
          shoe10_moved: false,
          shoe11_moved: false,
          pile_of_shoes: 0,
        })
      );
    };
  }, []);

  return (
    <Scene background="" offset={{ x: 0, y: 0 }}>
      <Static
        asset="assets/locations/school/first_hall_east/1fecorridor.webp"
        offset={{ x: 0, y: 0 }}
      />

      <Book offset={{ x: 238, y: 780 }} />
      <TrophyCase offset={{ x: 275, y: 122 }} />
      <Dollar2 offset={{ x: 492, y: 737 }} />
      <FootballTrophy offset={{ x: 528, y: 75 }} />

      {/* TODO: <Lindsey offset={{ x: 664, y: 267 }} /> */}

      <ExitArrow offset={{ x: 904, y: 921 }} />

      <GymDoor offset={{ x: 873, y: 280 }} />

      {/* TODO: <MrsL offset={{ x: 818, y: 348 }} /> */}

      <Static
        asset="assets/locations/school/first_hall_east/lamp.webp"
        offset={{ x: 663, y: 0 }}
      />
      <Static
        asset="assets/locations/school/first_hall_east/banner.webp"
        offset={{ x: 861, y: 0 }}
      />

      {/* TODO: <Flora offset={{ x: 1040, y: 342 }} /> */}

      <PoolDoor offset={{ x: 1172, y: 247 }} />

      <SwimTeamPhotos offset={{ x: 1278, y: 222 }} />

      <BathroomDoor offset={{ x: 1390, y: 160 }} />
      {false /* TODO: quest.maxine_wine == "locker" and mc.owned_item("flora_poster") and not quest.maxine_wine["sports_wing_poster"] */ && (
        <BulletinBoard offset={{ x: 1417, y: 303 }} />
      )}

      <Static
        asset="assets/locations/school/first_hall_east/shoesbox.webp"
        offset={{ x: 1238, y: 481, z: 1 }}
      />
      <Shoes
        id="shoe1"
        asset="assets/locations/school/first_hall_east/shoes1.webp"
        offset={{ x: 1245, y: 522 }}
      />
      <Shoes
        id="shoe2"
        asset="assets/locations/school/first_hall_east/shoes2.webp"
        offset={{ x: 1263, y: 507 }}
      />
      <Shoes
        id="shoe3"
        asset="assets/locations/school/first_hall_east/shoes3.webp"
        offset={{ x: 1263, y: 585 }}
      />
      <Shoes
        id="shoe4"
        asset="assets/locations/school/first_hall_east/shoes4.webp"
        offset={{ x: 1278, y: 542 }}
      />
      <Shoes
        id="shoe5"
        asset="assets/locations/school/first_hall_east/shoes5.webp"
        offset={{ x: 1279, y: 570 }}
      />
      <Shoes
        id="shoe6"
        asset="assets/locations/school/first_hall_east/shoes6.webp"
        offset={{ x: 1297, y: 582 }}
      />
      <Shoes
        id="shoe7"
        asset="assets/locations/school/first_hall_east/shoes7.webp"
        offset={{ x: 1443, y: 723 }}
      />
      <Shoes
        id="shoe8"
        asset="assets/locations/school/first_hall_east/shoes8.webp"
        offset={{ x: 1475, y: 657 }}
      />
      <Shoes
        id="shoe9"
        asset="assets/locations/school/first_hall_east/shoes9.webp"
        offset={{ x: 1508, y: 721 }}
      />
      <Shoes
        id="shoe10"
        asset="assets/locations/school/first_hall_east/shoes10.webp"
        offset={{ x: 1538, y: 690 }}
      />
      <Dollar3 offset={{ x: 1547, y: 676 }} />
      <Shoes
        id="shoe11"
        asset="assets/locations/school/first_hall_east/shoes11.webp"
        offset={{ x: 1541, y: 643 }}
      />
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 1 &&
        scene.pile_of_shoes < 11 && (
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes1.webp"
            offset={{ x: 1512, y: 573, z: 1 }}
          />
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 2 &&
        scene.pile_of_shoes < 11 && (
          <>
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes2.webp"
              offset={{ x: 1511, y: 543, z: 1 }}
            />
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes3.webp"
              offset={{ x: 1518, y: 528 }}
            />
          </>
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 3 &&
        scene.pile_of_shoes < 11 && (
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes4.webp"
            offset={{ x: 1511, y: 504 }}
          />
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 4 &&
        scene.pile_of_shoes < 11 && (
          <>
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes5.webp"
              offset={{ x: 1506, y: 484 }}
            />
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes6.webp"
              offset={{ x: 1504, y: 466 }}
            />
          </>
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 5 &&
        scene.pile_of_shoes < 11 && (
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes7.webp"
            offset={{ x: 1502, y: 438 }}
          />
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 6 &&
        scene.pile_of_shoes < 11 && (
          <>
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes8.webp"
              offset={{ x: 1513, y: 428 }}
            />
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes9.webp"
              offset={{ x: 1511, y: 394 }}
            />
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes10.webp"
              offset={{ x: 1511, y: 374 }}
            />
          </>
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 7 &&
        scene.pile_of_shoes < 11 && (
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes11.webp"
            offset={{ x: 1516, y: 354 }}
          />
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 8 &&
        scene.pile_of_shoes < 11 && (
          <>
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes12.webp"
              offset={{ x: 1511, y: 332 }}
            />
            <Static
              asset="assets/locations/school/first_hall_east/pileofshoes13.webp"
              offset={{ x: 1507, y: 312 }}
            />
          </>
        )}
      {typeof scene.pile_of_shoes === 'number' &&
        scene.pile_of_shoes >= 9 &&
        scene.pile_of_shoes < 11 && (
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes14.webp"
            offset={{ x: 1508, y: 295 }}
          />
        )}
      {scene.pile_of_shoes === 10 && (
        <>
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes15.webp"
            offset={{ x: 1502, y: 269 }}
          />
          <Static
            asset="assets/locations/school/first_hall_east/pileofshoes16.webp"
            offset={{ x: 1513, y: 253 }}
          />
        </>
      )}
      {scene.pile_of_shoes === 11 && (
        <PileOfShoes offset={{ x: 1502, y: 222 }} />
      )}
      {/* TODO: <Kate offset={{ x: 1360, y: 419 }} /> */}

      {scene.vent_ajar ? (
        <>
          {scene.pile_of_shoes === 11 ? (
            <VentAjar offset={{ x: 1455, y: 18 }} />
          ) : (
            <Static
              asset="assets/locations/school/first_hall_east/openvent.webp"
              offset={{ x: 1455, y: 18 }}
            />
          )}
        </>
      ) : (
        <>
          {scene.pile_of_shoes === 11 ? (
            <Vent offset={{ x: 1512, y: 18 }} />
          ) : (
            <Static
              asset="assets/locations/school/first_hall_east/vent.webp"
              offset={{ x: 1512, y: 18 }}
            />
          )}
        </>
      )}
      <Dollar1 offset={{ x: 1532, y: 95 }} />

      <LockerRoomsDoor offset={{ x: 1722, y: 0 }} />

      {(hour < 7 || hour > 18) && (
        <Static
          asset="assets/locations/school/first_hall_east/nightoverlay.webp"
          offset={{ x: 0, y: 0, z: 1 }}
        />
      )}
    </Scene>
  );
};

export default memo(SceneFirstHallEast);
