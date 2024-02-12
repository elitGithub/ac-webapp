// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleSkeptical: React.FC = () => {
  const { spinach, glasses, panties, bra, pants, shirt } = useAppSelector(
    (state) => getEquipment(state.character.isabelle)
  );

  return (
    <Expression id="isabelle" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_skeptical" layer="base" />
      {glasses && <Asset name="b1glasses" layer="base" />}

      {spinach ? (
        <Asset name="b1arm3_n" layer="base" />
      ) : (
        <Asset name="b1arm2_n" layer="base" />
      )}

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {shirt && <Asset name="b1tucked" layer="clothes" />}
      {pants && <Asset name="b1pants" layer="clothes" />}

      {shirt ? (
        spinach ? (
          <Asset name="b1arm3_c" layer="clothes" />
        ) : (
          <Asset name="b1arm2_c" layer="clothes" />
        )
      ) : null}
    </Expression>
  );
};

export default memo(IsabelleSkeptical);
