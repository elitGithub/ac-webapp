// Libraries
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { dayName } from 'state/features/time';

// Actions
import { advance, toggleXRay } from 'state/actions';

// Components
import Button from 'components/Button';
import EnergyBar from 'components/EnergyBar';

// Styles
import './index.scss';
import { XrayBar } from '../XrayDisplay';

export const TimeDisplay: React.FC = () => {
  const { day, hour, energy } = useAppSelector((state) => state.time);
  const xray = useAppSelector((state) => state.display.xray);
  const dispatch = useAppDispatch();

  const handleAdvance = useCallback(() => {
    dispatch(advance(1));
  }, [dispatch]);

  const handleXray = useCallback(() => {
    dispatch(toggleXRay());
  }, [dispatch]);

  return (
    <div className="time-display">
      <Button onClick={handleXray}>
        <XrayBar xrayState={xray} />
      </Button>
      <Button onClick={handleAdvance}>
        Day {day} - {dayName(day)} - {hour <= 12 ? hour : hour % 12}:00{' '}
        {hour < 12 ? 'AM' : 'PM'}
      </Button>

      <EnergyBar current={energy} max={100} />
    </div>
  );
};

export default TimeDisplay;
