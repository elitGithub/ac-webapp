// Libraries
import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

export const ScaleContext = React.createContext<number>(1);

interface ScaleProviderProps {
  children: React.ReactNode;
}

export const ScaleProvider: React.FC<ScaleProviderProps> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [hide, setHide] = useState(false);
  const scaleDebounce = useRef<ReturnType<typeof setTimeout>>();

  // Calculate scaling
  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920);
      setHide(false);
    };
    const debouncedHandleResize = () => {
      setHide(true);
      clearTimeout(scaleDebounce.current);
      scaleDebounce.current = setTimeout(handleResize, 500);
    };
    window.addEventListener('resize', debouncedHandleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return (
    <ScaleContext.Provider value={scale}>
      {hide && <div className={classNames('scale-overlay')}></div>}
      {children}
    </ScaleContext.Provider>
  );
};
