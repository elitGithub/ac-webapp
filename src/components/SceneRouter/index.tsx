// Libraries
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useAppSelector } from 'state/hooks';
import './index.scss';

// Components
import { SceneProvider } from 'components/SceneContext';

// Scenes
import SplashScreen from 'scenes/splashscreen/SplashScreen';

import HomeBathroom from 'scenes/home/Bathroom';
import HomeBedroom from 'scenes/home/Bedroom';
import HomeHall from 'scenes/home/Hall';
import HomeKitchen from 'scenes/home/Kitchen';

import SchoolEntrance from 'scenes/school/Entrance';
import SchoolForestGlade from 'scenes/school/ForestGlade';
import SchoolGroundFloor from 'scenes/school/GroundFloor';
import SchoolFirstHallWest from 'scenes/school/FirstHallWest';
import SchoolFirstHall from 'scenes/school/FirstHall';
import SchoolGroundFloorWest from 'scenes/school/GroundFloorWest';
import SchoolNurseRoom from 'scenes/school/NurseRoom';
import SchoolFirstHallEast from 'scenes/school/FirstHallEast';
import SchoolArtClass from 'scenes/school/ArtClass';
import SchoolGym from 'scenes/school/Gym';
import MainMenu from 'scenes/menu/MainMenu';
import SchoolHomeroom from 'scenes/school/Homeroom';
import { Intro } from 'scenes/intro';

export const SceneRouter: React.FC = () => {
  const scene = useAppSelector((state) => state.display.scene);
  const [current, setCurrent] = useState(scene);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If the scene changed
    if (scene !== current) {
      // Fade out current scene
      setVisible(false);

      // After fade out, change scene, fade in
      setTimeout(() => {
        setCurrent(scene);

        setTimeout(() => {
          setVisible(true);
        }, 0);
      }, 300);
    }
  }, [scene]);

  const scenes = () => {
    switch (current) {
      case 'splash_screen':
        return <SplashScreen />
      case 'main_menu':
        return <MainMenu />
      case 'intro':
        return <Intro />;
      case 'home_bathroom':
        return <HomeBathroom />;
      case 'home_bedroom':
        return <HomeBedroom />;
      case 'home_hall':
        return <HomeHall />;
      case 'home_kitchen':
        return <HomeKitchen />;
      case 'school_entrance':
        return <SchoolEntrance />;
      case 'school_forest_glade':
        return <SchoolForestGlade />;
      case 'school_ground_floor':
        return <SchoolGroundFloor />;
      case 'school_first_hall_west':
        return <SchoolFirstHallWest />;
      case 'school_first_hall':
        return <SchoolFirstHall />;
      case 'school_ground_floor_west':
        return <SchoolGroundFloorWest />;
      case 'school_nurse_room':
        return <SchoolNurseRoom />;
      case 'school_first_hall_east':
        return <SchoolFirstHallEast />;
      case 'school_art_class':
        return <SchoolArtClass />;
      case 'school_gym':
        return <SchoolGym />;
      case 'school_homeroom':
        return <SchoolHomeroom />;  
      default:
        return <div>Unsupported scene: {current}</div>;
    }
  };

  return (
    <SceneProvider className={classNames({ visible })}>
      {scenes()}
    </SceneProvider>
  );
};

export default SceneRouter;
