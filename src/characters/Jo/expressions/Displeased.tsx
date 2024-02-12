// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoDispleased: FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      <Asset name="b3hair" layer="base" />
      <Asset name="face_displeased" layer="base" />
      <Asset name="b3arm2" layer="base" />

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {glasses && <Asset name="b3glasses" layer="clothes" />}
      {pants && <Asset name="b3stocking" layer="clothes" />}
      {pants && <Asset name="b3skirt" layer="clothes" />}
      {shirt && <Asset name="b3blazer" layer="clothes" />}
    </Expression>
  );
};

export default memo(JoDispleased);
