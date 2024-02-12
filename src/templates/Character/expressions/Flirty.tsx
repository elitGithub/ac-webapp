// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoFlirty: React.FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      <Asset name="b2hair" layer="base" />
      <Asset name="face_flirty" layer="base" />
      <Asset name="b2arm2_n" layer="base" />

      {panties && <Asset name="b2panty" layer="underwear" />}
      {bra && <Asset name="b2bra" layer="underwear" />}

      {glasses && <Asset name="b2glasses" layer="clothes" />}
      {pants && <Asset name="b2stocking" layer="clothes" />}
      {pants && <Asset name="b2skirt" layer="clothes" />}
      {shirt && <Asset name="b2blazer" layer="clothes" />}
      {shirt && <Asset name="b2arm2_c" layer="clothes" />}
    </Expression>
  );
};

export default JoFlirty;
