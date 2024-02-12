// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoThinking: FC = () => {
  const { glasses, panties, phone, bra, pants, shirt } = useAppSelector(
    (state) => getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="b4hair" layer="base" />
      <Asset name="face_thinking" layer="base" />

      {phone ? (
        <Asset name="b4arm2_n_phone" layer="clothes" />
      ) : (
        <Asset name="b4arm2_n" layer="clothes" />
      )}

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {glasses && <Asset name="b4glasses" layer="clothes" />}
      {pants && <Asset name="b4stocking" layer="clothes" />}
      {pants && <Asset name="b4skirt" layer="clothes" />}
      {shirt && <Asset name="b4blazer" layer="clothes" />}

      {shirt ? (
        phone ? (
          <Asset name="b4arm2_c_phone" layer="clothes" />
        ) : (
          <Asset name="b4arm2_c" layer="clothes" />
        )
      ) : null}
    </Expression>
  );
};

export default memo(JoThinking);
