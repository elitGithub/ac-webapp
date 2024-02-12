// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const FloraWorried: React.FC = () => {
  const { panties, bra, pants, skirt, shirt, business, hat, blindfold } =
    useAppSelector((state) => getEquipment(state.character.flora));

  return (
    <Expression id="flora" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="face_worried" layer="base" />
      <Asset name="b4arm2_n" layer="base" />

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {pants && !skirt && <Asset name="b4pants" layer="clothes" />}
      {skirt && !pants && <Asset name="b4skirt" layer="clothes" />}
      {hat && <Asset name="b4chefhat" layer="clothes" />}
      {blindfold && <Asset name="b4bandage" layer="clothes" />}
      {business && !shirt && (
        <>
          <Asset name="b4shirt_business" layer="clothes" />
          <Asset name="b4arm2_business_c" layer="clothes" />
        </>
      )}
      {shirt && !business && (
        <>
          {skirt ? (
            <Asset name="b4shirt_knotted" layer="clothes" />
          ) : (
            <Asset name="b4shirt" layer="clothes" />
          )}
          <Asset name="b4arm1_c" layer="clothes" />
        </>
      )}
    </Expression>
  );
};

export default memo(FloraWorried);
