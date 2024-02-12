// Libraries
import React from 'react';
import { useAppDispatch, useAppSelector } from 'state/hooks';
import { dayName } from 'state/features/time';

// Actions
import { advance } from 'state/actions';

// Components
import Button from 'components/Button';
import EnergyBar from '../EnergyBar';
import InteractableWithText, { InteractableWithTextConfig } from 'components/InteractableWithText';

// Styles
import './index.scss';

export const TimeDisplay: React.FC<InteractableWithTextConfig> = () => {
  const { day, hour, energy } = useAppSelector((state) => state.time);
  const dispatch = useAppDispatch();

  const handleAdvance = () => {
    dispatch(advance(1));
  };

  return (
      <InteractableWithText 
        id='time_display'
        asset='assets/ui/hud/btn_time.webp'
        innerText={{
          title: `Day ${day} - ${dayName(day)} - ${hour <= 12 ? hour : hour % 12}:00${' '}${hour < 12 ? 'AM' : 'PM'}`,
          font: '2rem Fresca, Arial, sans-serif',
          textCenter: true
        }}
        hintText={{
          title: 'Advance Time'
        }}
        onClick={handleAdvance}
        render={true}
        imageSize={{ width: 220 }}
      />

  );
};

export default TimeDisplay;
      {/* <Button onClick={handleAdvance}>
        Day {day} - {dayName(day)} - {hour <= 12 ? hour : hour % 12}:00{' '}
        {hour < 12 ? 'AM' : 'PM'}
      </Button> */}

      {/* <EnergyBar current={energy} max={100} /> */}