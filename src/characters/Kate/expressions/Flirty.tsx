// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const KateFlirty: React.FC = () => {
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
  } = useAppSelector((state) => getEquipment(state.character.kate));

  return (
    <Expression id="kate" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_flirty" layer="base" />
      <Asset name="b1arm2_n" layer="base" />

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}
      {cheerleader_panties && (
        <Asset name="b1cheerleader_panties" layer="underwear" />
      )}
      {cheerleader_bra && <Asset name="b1cheerleader_bra" layer="underwear" />}

      {necklace && <Asset name="b1necklace" layer="clothes" />}
      {pants && <Asset name="b1pants" layer="clothes" />}
      {shirt && <Asset name="b1top" layer="clothes" />}
      {shirt && <Asset name="b1arm2_c" layer="clothes" />}
      {cheerleader_skirt && (
        <Asset name="b1cheerleader_skirt" layer="clothes" />
      )}
      {cheerleader_top && <Asset name="b1cheerleader_top" layer="clothes" />}
      {cheerleader_top && <Asset name="b1arm2_cheerleader" layer="clothes" />}
    </Expression>
  );
};

export default KateFlirty;
