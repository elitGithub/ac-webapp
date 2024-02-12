// Libraries
import React, {
  Children,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react';
import classNames from 'classnames';
import './index.scss';

// Context
import { PointerContext } from 'components/PointerContext';
import { ScaleContext } from 'components/ScaleContext';
import { SequenceContext, Sequence } from 'components/SequenceContext';

// Components
import NamePlate, { NamePlateConfig } from './components/NamePlate';
import { useAppSelector } from 'state/hooks';

export interface InteractableConfig {
  id?: string;
  asset?: string;
  offset: {
    x: number;
    y: number;
    z?: number;
  };
}

interface InteractableProps extends InteractableConfig {
  id: string;
  nameplate: NamePlateConfig;
  action: Sequence;
  render: boolean;
  children?: React.ReactNode;
}

export const Interactable: React.FC<InteractableProps> = ({
  id,
  asset,
  nameplate,
  offset,
  action,
  render: _render = true,
  children,
}) => {
  const { startSequence } = useContext(SequenceContext);
  const { moveTarget, clickTarget, setClickTarget, testMode } =
    useContext(PointerContext);
  const scale = useContext(ScaleContext);
  const [hover, setHover] = useState(false);
  const [render, setRender] = useState(_render);
  const [visible, setVisible] = useState(_render);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { phone, inventory } = useAppSelector( state => state.display.hud );

  // Disable pointer events if text or choices are visible
  const disabled = useAppSelector(
    (state) => !!state.display.text || !!state.display.choices
  );

  // Watch for changes in _render to make the item fade in/out
  useEffect(() => {
    // If _render changed to 'true', fade in
    if (_render) {
      setVisible(false);
      setRender(true);
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 1);

      return () => clearTimeout(timeout);
    } else {
      // Else, fade out
      setVisible(false);
      const timeout = setTimeout(() => {
        setRender(false);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [_render, setVisible, setRender]);

  // Load the asset and draw it
  useEffect(() => {
    if (!canvas.current) return;

    if (asset) {
      // Load the asset
      const image = new Image();
      const handleLoad = () => {
        if (!canvas.current) return;

        // Set the canvas dimensions
        const width = image.width;
        const height = image.height;
        canvas.current.width = width;
        canvas.current.height = height;
        setWidth(width);
        setHeight(height);

        // Draw the asset to the canvas
        const ctx = canvas.current.getContext('2d');
        if (!ctx)
          throw new Error(`Failed to obtain context for asset: ${nameplate.title}`);
        ctx.drawImage(image, 0, 0);
      };
      image.addEventListener('load', handleLoad);
      image.src = asset;

      return () => {
        image.removeEventListener('load', handleLoad);
      };
    } else {
      // Load all the assets
      const assets =
        Children.map(children, (child) => {
          if (!React.isValidElement(child)) return;

          const image = new Image();
          const loaded = new Promise((resolve) =>
            image.addEventListener('load', resolve)
          );
          image.src = child.props.asset;

          return {
            image,
            loaded,
            x: child.props.offset.x,
            y: child.props.offset.y,
          };
        })?.filter((asset) => asset !== undefined) ?? [];

      Promise.all(assets.map((asset) => asset.loaded)).then(() => {
        if (!canvas.current) return;

        // Set the canvas dimensions
        const width = Math.max(
          ...assets.map((asset) => asset.x + asset.image.width)
        );
        const height = Math.max(
          ...assets.map((asset) => asset.y + asset.image.height)
        );
        canvas.current.width = width;
        canvas.current.height = height;
        setWidth(width);
        setHeight(height);

        // Draw the assets to the canvas
        const ctx = canvas.current.getContext('2d');
        if (!ctx)
          throw new Error(`Failed to obtain context for asset: ${nameplate.title}`);
        assets.forEach((asset) => {
          ctx.drawImage(asset.image, asset.x, asset.y);
        });
      });

      // return () => {
      //   assets.forEach((asset) =>
      //     asset.image.removeEventListener('load', asset.handler)
      //   );
      // };
    }
  }, [asset, canvas.current]);

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');
    if (moveTarget === id && !disabled) {
      setHover(true);

      if (!ctx) return;
    } else {
      setHover(false);
    }
  }, [moveTarget, id]);

  useEffect(() => {
    if (clickTarget !== id) return;

    startSequence(action);
    setClickTarget('');
  }, [clickTarget, setClickTarget, id]);

  if (!render) return null;

  return (
    <div
      id={`interactable-${id}`}
      data-testid={`interactable-${id}`}
      className={classNames('interactable', { hover, visible })}
      onClick={() => testMode && startSequence(action)}
      onMouseOver={() => testMode && setHover(true)}
      onMouseOut={() => testMode && setHover(false)}
      style={{
        top: offset.y * scale,
        left: offset.x * scale,
        zIndex: offset.z ?? 1,
      }}
    >
      <div className="inner">
        <canvas
          id={id}
          ref={canvas}
          style={{
            width: width * scale,
            height: height * scale,
            filter: `brightness(${hover ? 1.1 : 1})`,
          }}
        ></canvas>
        {/* <div
          className={classNames('overlay', { hover })}
          style={{
            WebkitMaskImage: `url(${asset})`,
            maskImage: `url(${asset})`,
            WebkitMaskSize: `${width * scale}px ${height * scale}px`,
            maskSize: `${width * scale}px ${height * scale}px`,
          }}
        ></div> */}
      </div>
      {/* hide nameplate when overlay is open */}
      {!phone.open && !inventory.open && <NamePlate {...nameplate} visible={hover} />}
    </div>
  );
};

export default Interactable;
export * from './components/Asset';
