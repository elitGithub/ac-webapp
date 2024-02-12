// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const KateAnnoyed: React.FC = () => {
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
    <Expression id="kate" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      <Asset name="face_annoyed" layer="base" />
      <Asset name="b3arm2" layer="base" />

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}
      {cheerleader_panties && (
        <Asset name="b3cheerleader_panties" layer="underwear" />
      )}
      {cheerleader_bra && <Asset name="b3cheerleader_bra" layer="underwear" />}

      {necklace && <Asset name="b3necklace" layer="clothes" />}
      {pants && <Asset name="b3pants" layer="clothes" />}
      {shirt && <Asset name="b3top" layer="clothes" />}
      {cheerleader_skirt && (
        <Asset name="b3cheerleader_skirt" layer="clothes" />
      )}
      {cheerleader_top && <Asset name="b3cheerleader_top" layer="clothes" />}
    </Expression>
  );
};

export default KateAnnoyed;
