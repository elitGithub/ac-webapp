// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleThinking: React.FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.isabelle)
  );

  return (
    <Expression id="isabelle" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      <Asset name="face_thinking" layer="base" />
      {glasses && <Asset name="b3glasses" layer="base" />}

      <Asset name="b3arm2_n" layer="base" />

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {shirt && <Asset name="b3arm2_c" layer="clothes" />}
      {shirt && <Asset name="b3tucked" layer="clothes" />}
      {pants && <Asset name="b3pants" layer="clothes" />}
    </Expression>
  );
};

export default memo(IsabelleThinking);
