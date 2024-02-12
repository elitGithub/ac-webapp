// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleBlush: React.FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.isabelle)
  );

  return (
    <Expression id="isabelle" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="face_blush" layer="base" />
      {glasses && <Asset name="b4glasses" layer="base" />}

      <Asset name="b4arm1_n" layer="base" />

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {shirt && <Asset name="b4arm1_c" layer="clothes" />}
      {shirt && <Asset name="b4tucked" layer="clothes" />}
      {pants && <Asset name="b4pants" layer="clothes" />}
    </Expression>
  );
};

export default memo(IsabelleBlush);
