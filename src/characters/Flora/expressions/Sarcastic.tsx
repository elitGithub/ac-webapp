// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const FloraSarcastic: React.FC = () => {
  const { panties, bra, pants, skirt, shirt, hat, blindfold, phone } =
    useAppSelector((state) => getEquipment(state.character.flora));

  return (
    <Expression id="flora" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      {phone ? (
        <>
          <Asset name="face_sarcastic" layer="base" />
          <Asset name="b3armphone_n" layer="base" />
        </>
      ) : (
        <>
          <Asset name="face_sarcastic" layer="base" />
          <Asset name="b3arm2_n" layer="base" />
        </>
      )}

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {pants && !skirt && <Asset name="b3pants" layer="clothes" />}
      {skirt && !pants && <Asset name="b3skirt" layer="clothes" />}
      {hat && <Asset name="b3chefhat" layer="clothes" />}
      {blindfold && <Asset name="b3bandage" layer="clothes" />}

      {shirt && (
        <>
          {skirt ? (
            <Asset name="b3shirt_knotted" layer="clothes" />
          ) : (
            <Asset name="b3shirt" layer="clothes" />
          )}

          {phone ? (
            <Asset name="b3armphone_c" layer="clothes" />
          ) : (
            <Asset name="b3arm2_c" layer="clothes" />
          )}
        </>
      )}
    </Expression>
  );
};

export default memo(FloraSarcastic);
