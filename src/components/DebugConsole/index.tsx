// Libraries
import React, { useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'state/hooks';

// Types
import { Scene, goto as _goto } from 'state/features/display';

// Utils
import { convert } from './utils/convert';

export const DebugConsole: React.FC = () => {
  const dispatch = useAppDispatch();

  // Go to a scene
  const goto = useCallback(
    (scene: Scene, sceneTitle: string) => {
      dispatch(_goto({ scene, sceneTitle }));
    },
    [dispatch]
  );

  useEffect(() => {
    window.ac = {
      goto,
      convert,
    };

    return () => {
      delete window.ac;
    };
  }, [goto]);

  return <div />;
};

export default DebugConsole;
