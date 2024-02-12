// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

// Worried expression for character Jo
export const JoWorried: FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="b4hair" layer="base" />
      <Asset name="face_worried" layer="base" />
      <Asset name="b4arm2_n" layer="base" />

      {glasses && <Asset name="b4glasses" layer="clothes" />}
      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}
      {pants && <Asset name="b4stocking" layer="clothes" />}
      {pants && <Asset name="b4skirt" layer="clothes" />}
      {shirt && <Asset name="b4blazer" layer="clothes" />}
      {shirt && <Asset name="b4arm2_c" layer="clothes" />}
    </Expression>
  );
};

export default memo(JoWorried);
