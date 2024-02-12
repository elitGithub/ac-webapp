// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const FloraAngry: React.FC = () => {
  const { panties, bra, pants, skirt, shirt, hat, blindfold } = useAppSelector(
    (state) => getEquipment(state.character.flora)
  );

  return (
    <Expression id="flora" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_angry" layer="base" />
      <Asset name="b1arm2_n" layer="base" />

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {pants && <Asset name="b1pants" layer="clothes" />}
      {skirt && <Asset name="b1skirt" layer="clothes" />}

      {shirt && (
        <>
          <Asset name="b1arm2_c" layer="clothes" />
          {skirt ? (
            <Asset name="b1shirt_knotted" layer="clothes" />
          ) : (
            <Asset name="b1shirt" layer="clothes" />
          )}
        </>
      )}

      {hat && <Asset name="b1chefhat" layer="clothes" />}
      {blindfold && <Asset name="b1bandage" layer="clothes" />}
    </Expression>
  );
};

export default memo(FloraAngry);
