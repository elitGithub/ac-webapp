// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoConcerned: FC = () => {
  const { glasses, panties, bra, pants, shirt, cup } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="b1hair" layer="base" />
      <Asset name="face_concerned" layer="base" />

      {cup ? (
        <Asset name="b1tea1_n" layer="base" />
      ) : (
        <Asset name="b1arm2_n" layer="base" />
      )}

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {glasses && <Asset name="b1glasses" layer="clothes" />}
      {pants && <Asset name="b1stocking" layer="clothes" />}
      {pants && <Asset name="b1skirt" layer="clothes" />}
      {shirt && <Asset name="b1blazer" layer="clothes" />}

      {shirt && (
        <>
          {cup ? (
            <Asset name="b1tea1_c" layer="clothes" />
          ) : (
            <Asset name="b1arm2_c" layer="clothes" />
          )}
        </>
      )}
    </Expression>
  );
};

export default memo(JoConcerned);
