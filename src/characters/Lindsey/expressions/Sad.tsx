// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseySad: React.FC = () => {
  const { slap, panties, bra, towel, skirt, jacket } = useAppSelector((state) =>
    getEquipment(state.character.lindsey)
  );

  return (
    <Expression id="lindsey" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="b4arm1_n" layer="base" />
      <Asset name="face_sad" layer="base" />
      {slap && <Asset name="face_sad_slap" layer="base" />}

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {towel && <Asset name="b4towel1" layer="clothes" />}
      {skirt && <Asset name="b4skirt" layer="clothes" />}
      {jacket && <Asset name="b4jacket" layer="clothes" />}
      {jacket && <Asset name="b4arm1_c" layer="clothes" />}
    </Expression>
  );
};

export default LindseySad;
