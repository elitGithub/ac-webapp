// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const NurseThinking: React.FC = () => {
  const { oil, panties, bra, outfit, shirt, phone, masturbating } =
    useAppSelector((state) => getEquipment(state.character.nurse));

  return (
    <Expression id="nurse" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      <Asset name="face_thinking" layer="base" />

      {oil && <Asset name="b2oil" layer="base" />}

      {outfit && !masturbating && (
        <>
          <Asset name="b2arm2_n" layer="base" />

          {panties && <Asset name="b2panty" layer="underwear" />}
          {bra && <Asset name="b2bra" layer="underwear" />}

          {shirt && <Asset name="b2outfit" layer="clothes" />}
          {shirt && <Asset name="b2arm2_c" layer="clothes" />}
        </>
      )}

      {masturbating && !outfit && (
        <>
          <Asset name="b2arm2_n_vibrator" layer="base" />
          <Asset name="b2openshirt" layer="clothes" />
          <Asset name="b2arm2_c_vibrator" layer="clothes" />
        </>
      )}
    </Expression>
  );
};

export default NurseThinking;
