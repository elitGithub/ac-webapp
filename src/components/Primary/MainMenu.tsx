import React, { FC, memo, useCallback } from 'react';
import { IS_MOBILE } from '../../util/windowEnvironment';
import { useDispatch } from 'react-redux';
import './MainMenu.scss';
import { AppScreens, setCurrentScreen } from '../../state/MenuReducer';

type OwnProps = {
  registered: boolean;
  user?: {};
  onMenuItemSelection?: (key: number) => {}
};

const MainMenu: FC<OwnProps> = () => {
  const dispatch = useDispatch();

  const handleClick = useCallback((key: number) => {
    dispatch(setCurrentScreen(key));
  }, [dispatch]);

  const mainMenu = [
    { name: 'New Game', id: 'new-game', menuKey: AppScreens.NewGame },
    { name: 'Chapter Select', id: 'chapter-select', menuKey: AppScreens.ChapterSelect },
    { name: 'Tips and Tricks', id: 'tips-and-tricks', menuKey: AppScreens.TipsAndTricks },
    { name: 'Load Game', id: 'load-game', menuKey: AppScreens.LoadGame },
    { name: 'Settings', id: 'settings', menuKey: AppScreens.Settings },
    { name: 'Credits', id: 'credits', menuKey: AppScreens.Credits },
    { name: 'Quit', id: 'quit', menuKey: AppScreens.Quit }
  ];

  const renderMenuItems = () => {
    return mainMenu.map((item) => (
      <li key={item.id}>
        <button
          className='menu-button'
          onClick={() => handleClick(item.menuKey)}
        >
          {item.name}
        </button>
      </li>
    ));
  };

  return (
    <div className={`main-menu${IS_MOBILE ? ' mobile' : ''}`}>
      <ul className='menu-list'>{renderMenuItems()}</ul>
      <div className='logo'></div>
      {/* Add the logo div */}
      <div className='girl-photo'></div>
      {/* Add the girl-photo div */}
    </div>
  );

};

export default memo(MainMenu);
