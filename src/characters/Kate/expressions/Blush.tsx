// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const KateBlush: React.FC = () => {
  const {
    panties,
    bra,
    cheerleader_panties,
    cheerleader_bra,
    necklace,
    pants,
    shirt,
    cheerleader_skirt,
    cheerleader_top,
    blindfold,
    wig,
  } = useAppSelector((state) => getEquipment(state.character.kate));

  return (
    <Expression id="kate" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="face_blush" layer="base" />
      <Asset name="b4arm2" layer="base" />

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}
      {cheerleader_panties && (
        <Asset name="b4cheerleader_panties" layer="underwear" />
      )}
      {cheerleader_bra && <Asset name="b4cheerleader_bra" layer="underwear" />}

      {necklace && <Asset name="b4necklace" layer="clothes" />}
      {pants && <Asset name="b4pants" layer="clothes" />}
      {shirt && <Asset name="b4top" layer="clothes" />}
      {cheerleader_skirt && (
        <Asset name="b4cheerleader_skirt" layer="clothes" />
      )}
      {cheerleader_top && <Asset name="b4cheerleader_top" layer="clothes" />}
      {cheerleader_top && <Asset name="b4arm1_cheerleader" layer="clothes" />}
      {blindfold ? (
        wig ? (
          <Asset name="b4blindfold_wig" layer="clothes" />
        ) : (
          <Asset name="b4blindfold" layer="clothes" />
        )
      ) : (
        <Asset name="b4arm1" layer="base" />
      )}
    </Expression>
  );
};

export default KateBlush;
