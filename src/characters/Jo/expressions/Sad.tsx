// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

// Angry expression for character Jo
export const JoSad: FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="b4hair" layer="base" />
      <Asset name="face_sad" layer="base" />

      <Asset name="b4arm1_n" layer="base" />

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {glasses && <Asset name="b4glasses" layer="clothes" />}
      {pants && <Asset name="b4stocking" layer="clothes" />}
      {pants && <Asset name="b4skirt" layer="clothes" />}
      {shirt && <Asset name="b4blazer" layer="clothes" />}
      {shirt && <Asset name="b4arm1_c" layer="clothes" />}
    </Expression>
  );
};

export default memo(JoSad);
