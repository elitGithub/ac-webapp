// Libraries
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useAppSelector } from 'state/hooks';

// Context
import { ScaleContext } from 'components/ScaleContext';

export const PointerContext = React.createContext({
  x: 0,
  y: 0,
  moveTarget: '',
  setMoveTarget: (id: string) => {},
  clickTarget: '',
  setClickTarget: (id: string) => {},
  testMode: false,
  disabled: false
});

interface PointerProviderProps {
  children: React.ReactNode;
  testMode?: boolean;
}

export const PointerProvider: React.FC<PointerProviderProps> = ({
  children,
  testMode = false,
}) => {
  const scale = useContext(ScaleContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [moveTarget, setMoveTarget] = useState('');
  const [clickTarget, setClickTarget] = useState('');

  // Disable pointer events if text or choices are visible
  const disabled = useAppSelector(
    (state) => !!state.display.text || !!state.display.choices
  );

  const raycast = useCallback(
    (e: MouseEvent) => {
      // Ray-cast for canvases
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      const canvases = elements.filter(
        (el) => el.nodeName.toLowerCase() === 'canvas'
      );

      // Loop through the canvases and find the first non-opaque collision
      for (const canvas of canvases as HTMLCanvasElement[]) {
        const ctx = canvas.getContext('2d', {
          willReadFrequently: true,
        });
        if (!ctx) continue;

        const rect = canvas.getBoundingClientRect();

        const { data } = ctx.getImageData(
          Math.floor((e.clientX - rect.left) / scale),
          Math.floor((e.clientY - rect.top) / scale),
          1,
          1
        );

        // If the alpha channel is not 0, set our click target and break
        if (data[3] !== 0) {
          return canvas.id;
        }
      }
    },
    [scale]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      setX(e.clientX / scale);
      setY(e.clientY / scale);

      const id = raycast(e);

      setMoveTarget(id ?? '');
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setMoveTarget, scale]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();

      const id = raycast(e);

      setClickTarget(id ?? '');
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setClickTarget, scale, clickTarget]);

  return (
    <PointerContext.Provider
      value={{
        x,
        y,
        moveTarget: moveTarget,
        setMoveTarget,
        clickTarget: clickTarget,
        setClickTarget,
        testMode,
        disabled
      }}
    >
      {children}
    </PointerContext.Provider>
  );
};
