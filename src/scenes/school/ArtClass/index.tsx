// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { set } from 'state/actions';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import Lines from './interactables/Lines';
import Shelf from './interactables/Shelf';
import Brush from './interactables/Brush';
import BigBrush from './interactables/BigBrush';
import Door from './interactables/Door';
import SupplyCloset from './interactables/SupplyCloset';
import Discardedart3 from './interactables/Discardedart3';
import Discardedart2 from './interactables/Discardedart2';
import Discardedart1 from './interactables/Discardedart1';
import Easel1 from './interactables/Easel1';
import Easel3 from './interactables/Easel3';
import Easel3Sketch from './interactables/Easel3Sketch';
import Easel3Artinprogress from './interactables/Easel3Artinprogress';
import Cola from './interactables/Cola';
import Lollipop from './interactables/Lollipop';
import Donuts from './interactables/Donuts';
import StatueRight from './interactables/StatueRight';
import Chair1 from './interactables/Chair1';
import Easel2 from './interactables/Easel2';
import Ship from './interactables/Ship';
import ShipSmashed from './interactables/ShipSmashed';
import PaintBuckets from './interactables/PaintBuckets';
import Kate from './interactables/Kate';
import Nurse from './interactables/Nurse';
import Mrsl from './interactables/Mrsl';
import Flora from './interactables/Flora';
import Book from './interactables/Book';
import Isabelle from './interactables/Isabelle';
import Jacklyn from './interactables/Jacklyn';
import JacklynPose from './interactables/JacklynPose';
import CatLook from './interactables/CatLook';
import CatRun from './interactables/CatRun';
import Candy7 from './interactables/Candy7';
import Candy6 from './interactables/Candy6';
import Candy5 from './interactables/Candy5';
import Candy3 from './interactables/Candy3';
import Candy1 from './interactables/Candy1';
import Lindsey from './interactables/Lindsey';
import Dollar3 from './interactables/Dollar3';
import Dollar2 from './interactables/Dollar2';
import Dollar1 from './interactables/Dollar1';

export const SceneArtClass: React.FC = () => {
  const scene = useAppSelector((state) => state.scene.school_art_class);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      set({
        scene: 'school_art_class',
        dollar1_spawned_today: Math.random() < 0.25,
        dollar2_spawned_today: Math.random() < 0.25,
        dollar3_spawned_today: Math.random() < 0.25,
      })
    );
    return () => {
      // On exit
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <Scene
      background="assets/locations/school/art_class/art_class.webp"
      offset={{ x: 0, y: 0 }}
    >
      <Lines offset={{ x: 669, y: 707 }} />
      <Shelf offset={{ x: 54, y: 214 }} />
      {!scene.brush_taken && <Brush offset={{ x: 1721, y: 801 }} />}
      <BigBrush offset={{ x: 1729, y: 734 }} />
      <Door offset={{ x: 1080, y: 363 }} />
      <SupplyCloset offset={{ x: 1515, y: 220 }} />
      <Static
        asset="assets/locations/school/art_class/paintings.webp"
        offset={{ x: 672, y: 270 }}
      />
      {!scene.discarded_art_3_taken && (
        <Discardedart3 offset={{ x: 1371, y: 854 }} />
      )}
      {!scene.discarded_art_2_taken && (
        <Discardedart2 offset={{ x: 1161, y: 835 }} />
      )}
      {!scene.discarded_art_1_taken && (
        <Discardedart1 offset={{ x: 87, y: 871 }} />
      )}
      <Easel1 offset={{ x: 920, y: 409 }} />
      <Easel3 offset={{ x: 841, y: 422 }} /*TODO: Easel for jacklyn_sweets*/ />
      {false && <Easel3Sketch offset={{ x: 841, y: 423 }} />}
      {false && <Easel3Artinprogress offset={{ x: 841, y: 423 }} />}
      {false && <Cola offset={{ x: 868, y: 423 }} />}
      {false && <Lollipop offset={{ x: 892, y: 513 }} />}
      {false && <Donuts offset={{ x: 929, y: 485 }} />}
      <StatueRight offset={{ x: 1404, y: 333 }} />
      <Static
        asset="assets/locations/school/art_class/statue_left.webp"
        offset={{ x: 610, y: 309 }}
      />
      <Chair1 offset={{ x: 356, y: 507 }} />
      <Easel2 offset={{ x: 1318, y: 414 }} />
      <Ship offset={{ x: 905, y: 4 }} />
      {false && <ShipSmashed offset={{ x: 897, y: 232 }} />}
      {scene.easel_paint_buckets && (
        <PaintBuckets offset={{ x: 829, y: 627 }} />
      )}
      <Kate offset={{ x: 849, y: 408 }} />
      <Nurse offset={{ x: 719, y: 595 }} />
      <Mrsl offset={{ x: 506, y: 372 }} />
      <Flora offset={{ x: 656, y: 345 }} />
      {!scene.book_taken && <Book offset={{ x: 230, y: 472 }} />}
      <Isabelle offset={{ x: 172, y: 339 }} />
      <Jacklyn offset={{ x: 361, y: 389 }} />
      <JacklynPose offset={{ x: 333, y: 381 }} />
      <CatLook offset={{ x: 1229, y: 671 }} />
      <CatRun offset={{ x: 1205, y: 687 }} />
      {!scene.candy7_taken && <Candy7 offset={{ x: 1710, y: 735 }} />}
      {!scene.candy6_taken && <Candy6 offset={{ x: 1670, y: 809 }} />}
      {!scene.candy5_taken && <Candy5 offset={{ x: 1560, y: 854 }} />}
      {!scene.candy3_taken && <Candy3 offset={{ x: 1252, y: 806 }} />}
      {!scene.candy1_taken && <Candy1 offset={{ x: 1193, y: 638 }} />}
      <Lindsey offset={{ x: 1230, y: 400 }} />
      <Dollar3 offset={{ x: 1613, y: 256 }} />
      <Dollar2 offset={{ x: 814, y: 465 }} />
      <Dollar1 offset={{ x: 253, y: 301 }} />
    </Scene>
  );
};

export default memo(SceneArtClass);
