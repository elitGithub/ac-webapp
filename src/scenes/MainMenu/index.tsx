// Libraries
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';

// Components
import Scene from 'components/Scene';
import Static from 'components/Static';

// Actions
import { setXRay, show, moveTo } from 'state/actions';


// Interactables
import NewGame from './interactables/NewGame';
import ChapterSelect from './interactables/ChapterSelect';
import LoadGame from './interactables/LoadGame';
import TipsTricks from './interactables/TipsTricks';
import Settings from './interactables/Settings';
import Credits from './interactables/Credits';

export const SceneMainMenu: React.FC = () => {
  const scene = useAppSelector((state) => state.display.scene);
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState<number>(0);

  const imageUrls = [
    'assets/ui/main_menu/redesign/bg/main_menu_0.webp',
    'assets/ui/main_menu/redesign/bg/main_menu_1.webp',
    'assets/ui/main_menu/redesign/bg/main_menu_2.webp',
    'assets/ui/main_menu/redesign/bg/main_menu_3.webp',
    'assets/ui/main_menu/redesign/bg/main_menu_4.webp',
  ]

  useEffect( () => {
    // toggle off xray after menu exit
    if(scene !== 'main_menu') {
      dispatch(setXRay('off'));
    }
  }, [scene])

  useEffect(() => {
    // On enter
    dispatch(setXRay('full'));
    dispatch(show('kate','angel', { with: { dissolve: 500} }));
    dispatch(moveTo('kate',0.7))

    const anim = setInterval( () => {
      setIndex( prev => {
        if(prev === 4) return 0;
        return prev+1;
      } )
    }, 5000)
    
    return () => {
      // On exit
      clearInterval(anim);
    };
  }, []);

  // TODO: Update background asset path and offset
  return (
    <div>
      <Scene background={imageUrls[index]} offset={{ x: 0, y: 0 }}>

        <Static asset='assets/ui/main_menu/redesign/ray_overlay.webp' offset={{ x: -80, y: 0 }} fade={true} />
        <Static asset='assets/ui/main_menu/redesign/strip_top.webp' offset={{ x: 100, y: -20 }} fade={true} />
        <Static asset='assets/ui/main_menu/redesign/strip_bottom.webp' offset={{ x: 100, y: 484 }} fade={true} />

        <Static asset='assets/ui/main_menu/redesign/team_and_game_logos.webp' offset={{ x: 25, y: -20 }} fade={true} />
        
        <NewGame offset={{ x: 50, y: 550 }} />
        <LoadGame offset={{ x: 50, y: 630 }} />
        <ChapterSelect offset={{ x: 50, y: 790 }} />
        <TipsTricks offset={{ x: 50, y: 710 }} />
        <Settings offset={{ x: 50, y: 870 }} />
        <Credits offset={{ x: 50, y: 950 }} />
      </Scene>
    </div>
  );
};

export default React.memo(SceneMainMenu);
