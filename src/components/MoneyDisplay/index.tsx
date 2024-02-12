// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';

// Styles
import './index.scss';

export const MoneyDisplay: React.FC = () => {
  const money = useAppSelector((state) => state.character.mc.money);

  return (
    <div className="money-display">
      <div className="money-display__icon">
        <img src="assets/ui/hud/icon_money.webp" alt="" />
      </div>
      {money}
    </div>
  );
};

export default MoneyDisplay;
