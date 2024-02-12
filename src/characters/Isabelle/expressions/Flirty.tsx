// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleFlirty: React.FC = () => {
  const { glasses, panties, bra, pants, shirt, holdingpanties } =
    useAppSelector((state) => getEquipment(state.character.isabelle));

  return (
    <Expression id="isabelle" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      <Asset name="face_flirty" layer="base" />
      {glasses && <Asset name="b3glasses" layer="base" />}

      {holdingpanties ? (
        <Asset name="b3arm2_panties_n" layer="base" />
      ) : (
        <Asset name="b3arm2_n" layer="base" />
      )}

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {shirt && <Asset name="b3tucked" layer="clothes" />}
      {pants && <Asset name="b3pants" layer="clothes" />}

      {shirt ? (
        holdingpanties ? (
          <Asset name="b3arm2_panties_c" layer="clothes" />
        ) : (
          <Asset name="b3arm2_c" layer="clothes" />
        )
      ) : null}
    </Expression>
  );
};

export default memo(IsabelleFlirty);
