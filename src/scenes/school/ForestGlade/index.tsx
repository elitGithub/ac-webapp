// Libraries
import React, { memo, useEffect } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Interactables
import House from './interactables/House';
import Road from './interactables/Road';

export const SceneForestGlade: React.FC = () => {
  const scene = useAppSelector((state) => state.scene.school_forest_glade);

  useEffect(() => {
    // On enter

    return () => {
      // On exit
    };
  }, []);

  return (
    <Scene
      background="assets/locations/school/forest_glade/sky.webp"
      offset={{ x: 0, y: 0 }}
    >
      {/* scene.append([(0,184),"school forest_glade tree_back"]) */}
      <Static
        asset="assets/locations/school/forest_glade/tree_back.webp"
        offset={{ x: 0, y: 184 }}
      />

      {/* scene.append([(0,591),"school forest_glade road_left","school_forest_glade_road_left"]) */}
      <Road offset={{ x: 0, y: 591 }} />

      {/* scene.append([(1481,654),"school forest_glade road_right"]) */}
      <Static
        asset="assets/locations/school/forest_glade/road_right.webp"
        offset={{ x: 1481, y: 654 }}
      />

      <House offset={{ x: 419, y: 391 }} />

      {/* scene.append([(0,519),"school forest_glade bushes"]) */}
      <Static
        asset="assets/locations/school/forest_glade/bushes.webp"
        offset={{ x: 0, y: 519 }}
      />

      {scene.farm ? (
        <>
          <Static
            asset="assets/locations/school/forest_glade/earth.webp"
            offset={{ x: 797, y: 422 }}
          />
          {scene.farm === 'dry' ? (
            <Static
              asset="assets/locations/school/forest_glade/dry.webp"
              offset={{ x: 797, y: 422 }}
            />
          ) : scene.farm === 'wet' ? (
            <>
              <Static
                asset="assets/locations/school/forest_glade/watered.webp"
                offset={{ x: 797, y: 422 }}
              />
              <Static
                asset="assets/locations/school/forest_glade/watercanal_lvl0.webp"
                offset={{ x: 842, y: 642 }}
              />
            </>
          ) : null}
        </>
      ) : (
        <Static
          asset="assets/locations/school/forest_glade/meadow.webp"
          offset={{ x: 797, y: 630 }}
        />
      )}
    </Scene>
  );
};

export default memo(SceneForestGlade);
