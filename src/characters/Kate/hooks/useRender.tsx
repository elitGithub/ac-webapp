// Libraries
import { useAppSelector } from 'state/hooks';
import { useLocation } from './useLocation';

type RenderHook = (overrides: () => boolean) => boolean;

export const useRender: RenderHook = (overrides = () => true) => {
  const { isSpeaking, currentLocation } = useAppSelector((state) => ({
    isSpeaking: state.character.current.includes('kate'),
    currentLocation: state.display.scene,
  }));
  const { location } = useLocation();

  // Run overrides, and exit if they return false
  if (!overrides()) return false;

  // Don't show if character is speaking
  if (isSpeaking) return false;

  // Don't show if the current location doesn't match character location
  if (currentLocation !== location) return false;

  // If we haven't failed out at this point, go ahead and render
  return true;
};
