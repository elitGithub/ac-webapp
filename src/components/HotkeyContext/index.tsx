// Libraries
import React, { useContext, useEffect } from 'react';
import { useAppDispatch } from 'state/hooks';

// Actions
import { clearText, goto, toggleXRay } from 'state/features/display';
import { SequenceContext } from 'components/SequenceContext';

export const HotkeyContext = React.createContext({});

interface HotkeyProviderProps {
  children: React.ReactNode;
}

export const HotkeyProvider: React.FC<HotkeyProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { previousSequence, next } = useContext(SequenceContext);

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'x':
          dispatch(toggleXRay());
          break;
        case 'm': 
          // ? Clear text before going to main menu
          dispatch(clearText());
          dispatch(goto({ scene: 'main_menu', sceneTitle: 'Main Menu' }));
          break;
        case 'f':
          // Check if window is on fullscreen
          if (window.innerHeight === screen.height) {
            // Currently in fullscreen mode
            document.exitFullscreen();
          } else {
            // Go Fullscreen mode
            document.body.requestFullscreen();
          }
          break;
        case 'z':
          next();
      }
    };

    window.addEventListener('keypress', handleKeypress);

    return () => {
      window.removeEventListener('keypress', handleKeypress);
    };
  }, []);

  return <HotkeyContext.Provider value={{}}>{children}</HotkeyContext.Provider>;
};
