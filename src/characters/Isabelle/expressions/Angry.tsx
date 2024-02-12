// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleAngry: React.FC = () => {
  const { glasses, panties, bra, pants, shirt, holdingpanties } =
    useAppSelector((state) => getEquipment(state.character.isabelle));

  return (
    <Expression id="isabelle" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="face_angry" layer="base" />
      {glasses && <Asset name="b4glasses" layer="base" />}

      {holdingpanties ? (
        <Asset name="b4arm2_panties_n" layer="base" />
      ) : (
        <Asset name="b4arm2_n" layer="base" />
      )}

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {shirt && <Asset name="b4tucked" layer="clothes" />}
      {pants && <Asset name="b4pants" layer="clothes" />}

      {shirt ? (
        holdingpanties ? (
          <Asset name="b4arm2_panties_c" layer="clothes" />
        ) : (
          <Asset name="b4arm2_c" layer="clothes" />
        )
      ) : null}
    </Expression>
  );
};

export default memo(IsabelleAngry);
