// Libraries
import React, { FC, ReactNode } from 'react';

interface SceneContextData {
  className: string;
}

export const SceneContext = React.createContext({
  className: '',
});

interface SceneProviderProps {
  className: string;
  children: ReactNode;
}

export const SceneProvider: FC<SceneProviderProps> = ({
  className,
  children,
}) => {
  return (
    <SceneContext.Provider value={{ className }}>
      {children}
    </SceneContext.Provider>
  );
};
