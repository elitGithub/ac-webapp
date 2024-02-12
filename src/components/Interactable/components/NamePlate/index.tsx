// Libraries
import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import './index.scss';
import { ScaleContext } from 'components/ScaleContext';

export interface NamePlateConfig {
  title: string;
  description: string;
  offset?: {
    x: number;
    y: number;
    z?: number;
  }
}

interface NamePlateBaseProps extends NamePlateConfig {
  visible: boolean;
}

export const NamePlate: React.FC<NamePlateBaseProps> = ({
  title,
  description = '',
  offset,
  visible: _visible,
}) => {
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const visibleDebounce = useRef<ReturnType<typeof setTimeout>>();
  const scale = useContext(ScaleContext);

  useEffect(() => {
    // check if there's descrition added
    if(description.length === 0) {
      setHasDescription(false)
    } else {
      setHasDescription(true)
    }

    clearTimeout(visibleDebounce.current);
    visibleDebounce.current = setTimeout(() => {
      if (_visible) {
        setRender(true);
        setTimeout(() => setVisible(true), 0);
      } else {
        setVisible(false);
        setTimeout(() => setRender(false), 200);
      }
    }, 100);
  }, [_visible]);

  if (!render) return null;

  return (
    <div 
      style={ offset && {
        top:  `${offset.y * scale}px` ,
        left: `${offset.x * scale}px` 
      }}
      className={classNames('name-plate', { visible })}
    >
      <div className={classNames('title', { 'padding': !hasDescription }) }>{title}</div>
      {hasDescription && <div className="description">
        <Markdown>{description}</Markdown>
      </div>}
    </div>
  );
};

export default NamePlate;
