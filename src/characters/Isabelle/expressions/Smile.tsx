// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleSmile: React.FC = () => {
  const { glasses, panties, bra, pants, shirt, left } = useAppSelector(
    (state) => getEquipment(state.character.isabelle)
  );

  return (
    <Expression id="isabelle" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      {glasses && <Asset name="b2glasses" layer="base" />}

      {left ? (
        <Asset name="face_smile_left" layer="base" />
      ) : (
        <Asset name="face_smile" layer="base" />
      )}

      <Asset name="b2arm_n" layer="base" />

      {panties && <Asset name="b2panty" layer="underwear" />}
      {bra && <Asset name="b2bra" layer="underwear" />}

      {shirt && <Asset name="b2tucked" layer="clothes" />}
      {shirt && <Asset name="b2arm_c" layer="clothes" />}
      {pants && <Asset name="b2pants" layer="clothes" />}
    </Expression>
  );
};

export default memo(IsabelleSmile);
