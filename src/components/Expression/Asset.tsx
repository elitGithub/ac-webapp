// Libraries
import React, { useContext } from 'react';
import { useAppSelector } from 'state/hooks';

// Context
import { ExpressionContext } from './context/ExpressionContext';
import { ScaleContext } from 'components/ScaleContext';
import { PointerContext } from 'components/PointerContext';

type AssetLayer = 'base' | 'underwear' | 'clothes';

interface AssetProps {
  name: string;
  layer: AssetLayer;
}

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export const Asset: React.FC<AssetProps> = ({ name, layer }) => {
  const { id, definitions } = useContext(ExpressionContext);
  const { xray, position } = useAppSelector((state) => ({
    xray: state.display.xray,
    position: state.character[id].position,
  }));
  const scale = useContext(ScaleContext);
  const { x: px, y: py } = useContext(PointerContext);

  if (!definitions.hasOwnProperty(name))
    throw new Error(
      `Asset with name ${name} does not have coordinates in the provided definitions`
    );

  const { x, y, z } = definitions[name as keyof typeof definitions] ?? {};

  const isXRayEnabled = () => {
    if (layer === 'clothes' && ['partial', 'full'].includes(xray)) return true;
    return layer === 'underwear' && xray === 'full';

  };

  return (
    <div
      className="asset"
      style={{
        left: x,
        top: y,
        zIndex: z,
      }}
    >
      <img
        src={`assets/characters/${id}/avatar/${name}.webp`}
        alt=""
        style={{
          maskImage: isXRayEnabled()
            ? `url('assets/ui/xray_mask.webp')`
            : undefined,
          WebkitMaskImage: isXRayEnabled()
            ? `url('assets/ui/xray_mask.webp')`
            : undefined,
          maskPosition: `${clamp(
            px - x - 960 - 1920 * position,
            -1300,
            0
          )}px ${clamp(py - y - 960, -1080, 0)}px`,
          WebkitMaskPosition: `${clamp(
            px - x - 960 - 1920 * position,
            -1300,
            0
          )}px ${clamp(py - y - 960, -1080, 0)}px`,
        }}
      />
    </div>
  );
};
