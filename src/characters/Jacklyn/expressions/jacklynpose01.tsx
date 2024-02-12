// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JacklynPose01: FC = () => {
  const { shirt, pants, panties, bra } = useAppSelector((state) =>
    getEquipment(state.character.jacklyn)
  );
  const naked = () => {
    if (!shirt && !pants) {
      return true;
    }
    return false;
  };

  return (
    <Expression id="jacklyn" definitions={data.jacklynpose01}>
      <Asset name="events/upskirt/JacklynUpskirt_n" layer="base" />
      {panties && (
        <Asset name="events/upskirt/JacklynUpskirt_panty" layer="underwear" />
      )}
      {bra && (
        <Asset name="events/upskirt/JacklynUpskirt_bra" layer="underwear" />
      )}
      {!naked() && (
        <Asset name="events/upskirt/JacklynUpskirt_c" layer="clothes" />
      )}
    </Expression>
  );
};

export default memo(JacklynPose01);
