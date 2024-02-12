// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseyAngry: React.FC = () => {
  const { panties, bra, towel, skirt, jacket } = useAppSelector((state) =>
    getEquipment(state.character.lindsey)
  );

  return (
    <Expression id="lindsey" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="b1arm1_n" layer="base" />
      <Asset name="face_angry" layer="base" />

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {towel && <Asset name="b1towel1" layer="clothes" />}
      {skirt && <Asset name="b1skirt" layer="clothes" />}
      {jacket && <Asset name="b1jacket" layer="clothes" />}
      {jacket && <Asset name="b1arm1_c" layer="clothes" />}
    </Expression>
  );
};

export default LindseyAngry;
