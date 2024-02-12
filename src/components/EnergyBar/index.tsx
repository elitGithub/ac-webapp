// Libraries
import React, { FC, memo } from 'react';

// Styles
import './index.scss';

interface EnergyBarProps {
  current: number;
  max: number;
}

export const EnergyBar: FC<EnergyBarProps> = ({ current, max }) => {
  return (
    <div className="energy-bar">
      <div className="energy-bar__bar">
        <div className="background">
          <div
            className="current"
            style={{ width: `${(current / max) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="energy-bar__label">
        {current}/{max}
      </div>
    </div>
  );
};

export default memo(EnergyBar);
