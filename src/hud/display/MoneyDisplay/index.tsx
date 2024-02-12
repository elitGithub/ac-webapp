// Libraries
import React, { useContext } from 'react';
import { useAppSelector } from 'state/hooks';

// Styles
import './index.scss';
import { ScaleContext } from 'components/ScaleContext';

export const MoneyDisplay: React.FC = () => {
  const money = useAppSelector((state) => state.character.mc.money);
  const scale = useContext(ScaleContext);

  return (
    <div className="money-display">
      <div className="money-display__icon">
        <img src="assets/ui/hud/icon_money.webp" alt=""
          style={{ transform: `scale(${scale})` }}
        />
      </div>
      {money}
    </div>
  );
};

export default MoneyDisplay;
