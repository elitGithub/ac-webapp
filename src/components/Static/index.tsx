// Libraries
import React, { useState, SyntheticEvent } from 'react';
import './index.scss';
import classNames from 'classnames';

interface StaticProps {
  asset: string;
  offset: {
    x: number;
    y: number;
    z?: number;
  };
  fade?: boolean;
}

export const Static: React.FC<StaticProps> = ({ asset, offset, fade = false }) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setWidth((e.currentTarget.naturalWidth / 1920) * 100);
    setHeight((e.currentTarget.naturalHeight / 1920) * 100);
  };

  return (
    <img
      className={classNames("static-asset", { fade })}
      src={asset}
      alt=""
      style={{
        left: `${(offset.x / 1920) * 100}vw`,
        top: `${(offset.y / 1920) * 100}vw`,
        width: `${width}vw`,
        height: `${height}vw`,
        zIndex: offset.z ?? 0,
      }}
      onLoad={handleLoad}
    />
  );
};

export default Static;
