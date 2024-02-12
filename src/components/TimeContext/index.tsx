// Libraries
import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'state/hooks';

interface TimeContextData {
  onHour: (callback: () => void) => () => void;
  onDay: (callback: () => void) => () => void;
}

export const TimeContext = React.createContext<TimeContextData>({
  onHour: () => () => {},
  onDay: () => () => {},
});

interface TimeProviderProps {
  children: React.ReactNode;
}

export const TimeProvider: React.FC<TimeProviderProps> = ({ children }) => {
  const hourCallbacks = useRef(new Set<() => void>());
  const dayCallbacks = useRef(new Set<() => void>());

  const [lastHour, setLastHour] = useState(0);
  const [lastDay, setLastDay] = useState(0);

  const { hour, day } = useAppSelector((state) => state.time);

  useEffect(() => {
    if (hour !== lastHour) {
      hourCallbacks.current.forEach((callback) => callback());
      setLastHour(hour);
    }

    if (day !== lastDay) {
      dayCallbacks.current.forEach((callback) => callback());
      setLastDay(day);
    }
  }, [hour, lastHour, day, lastDay]);

  const registerHourCallback = (callback: () => void) => {
    hourCallbacks.current.add(callback);

    return () => {
      hourCallbacks.current.delete(callback);
    };
  };

  const registerDayCallback = (callback: () => void) => {
    dayCallbacks.current.add(callback);

    return () => {
      dayCallbacks.current.delete(callback);
    };
  };

  return (
    <TimeContext.Provider
      value={{
        onHour: registerHourCallback,
        onDay: registerDayCallback,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
