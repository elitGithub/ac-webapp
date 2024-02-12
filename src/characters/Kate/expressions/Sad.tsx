// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const KateSad: React.FC = () => {
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
    hands_up,
    rope,
  } = useAppSelector((state) => getEquipment(state.character.kate));

  return (
    <Expression id="kate" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      <Asset name="face_sad" layer="base" />
      {rope ? (
        hands_up ? (
          <Asset name="b2arm1_rope" layer="base" />
        ) : (
          <Asset name="b2arm2_rope" layer="base" />
        )
      ) : hands_up ? (
        <Asset name="b2arm1" layer="base" />
      ) : (
        <Asset name="b2arm2" layer="base" />
      )}

      {panties && <Asset name="b2panty" layer="underwear" />}
      {bra && <Asset name="b2bra" layer="underwear" />}
      {cheerleader_panties && (
        <Asset name="b2cheerleader_panties" layer="underwear" />
      )}
      {cheerleader_bra && <Asset name="b2cheerleader_bra" layer="underwear" />}

      {necklace && <Asset name="b2necklace" layer="clothes" />}
      {pants && <Asset name="b2pants" layer="clothes" />}
      {shirt && <Asset name="b2top" layer="clothes" />}
      {cheerleader_skirt && (
        <Asset name="b2cheerleader_skirt" layer="clothes" />
      )}
      {cheerleader_top && <Asset name="b2cheerleader_top" layer="clothes" />}
      {cheerleader_top ? (
        hands_up ? (
          <Asset name="b2arm1_cheerleader" layer="base" />
        ) : (
          <Asset name="b2arm2_cheerleader" layer="base" />
        )
      ) : null}
    </Expression>
  );
};

export default KateSad;
