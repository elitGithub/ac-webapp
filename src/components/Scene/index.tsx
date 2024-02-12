// Libraries
import React, { memo, useCallback, useContext } from 'react';
import classNames from 'classnames';
import './index.scss';

// Components
import ChoiceDisplay from 'components/ChoiceDisplay';
import MoneyDisplay from 'components/MoneyDisplay';
import TextDisplay from 'components/TextDisplay';
import TimeDisplay from 'components/TimeDisplay';

// Characters
import Flora from 'characters/Flora';
import Isabelle from 'characters/Isabelle';
import Jo from 'characters/Jo';
import MrsL from 'characters/MrsL';
import Kate from 'characters/Kate';
import Lindsey from 'characters/Lindsey';
import Nurse from 'characters/Nurse';
import Jacklyn from 'characters/Jacklyn';

// Context
import { ScaleContext } from 'components/ScaleContext';
import { SceneContext } from 'components/SceneContext';
import { useAppSelector } from 'state/hooks';
import Hud from 'hud';

export interface SceneProps {
  background: string;
  children: React.ReactNode;
  offset: {
    x: number;
    y: number;
  };
}

export const Scene: React.FC<SceneProps> = ({
  background,
  children,
  offset,
}) => {
  const scale = useContext(ScaleContext);
  const { className } = useContext(SceneContext);
  const scene = useAppSelector( state => state.display.scene );

  return (
    <div
      className={classNames('scene', {visible: className, "main-menu": scene === 'main_menu' || scene === 'splash_screen'})}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {children}

      <Hud />

      <Flora />
      <MrsL />
      <Isabelle />
      <Jo />
      <Kate />
      <Lindsey />
      <Nurse />
      <Jacklyn />
    </div>
  );
};

export default memo(Scene);
