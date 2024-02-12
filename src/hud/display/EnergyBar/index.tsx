// Libraries
import React, { useContext } from 'react';

// Styles
import './index.scss';
import { ScaleContext } from 'components/ScaleContext';

interface EnergyBarProps {
  current: number;
  max: number;
}

export const EnergyBar: React.FC<EnergyBarProps> = ({ current, max }) => {
  const scale = useContext(ScaleContext);

  return (
    <div style={{ width: 220 * scale, height: 50 * scale }} className="energy-bar">
      <div style={{ border: `${5 * scale}px solid #6d401c` }} className="energy-bar__bar">
        <div style={{ border: `${4 * scale}px solid #fff9e7` }} className="background">
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


export default EnergyBar;
