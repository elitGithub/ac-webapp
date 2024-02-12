// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseyThinking: React.FC = () => {
  const {
    panties,
    bra,
    towel,
    skirt,
    sweatpants,
    jacket,
    cropped_hoodie,
    bottle,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));

  return (
    <Expression id="lindsey" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      {bottle ? (
        <>
          <Asset name="b3bottle_n" layer="base" />
          <Asset name="face_thinking_bottle" layer="base" />
        </>
      ) : (
        <>
          <Asset name="b3arm1_n" layer="base" />
          <Asset name="face_thinking" layer="base" />
        </>
      )}

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {towel && <Asset name="b3towel1" layer="clothes" />}
      {skirt && <Asset name="b3skirt" layer="clothes" />}
      {sweatpants && <Asset name="b3sweatpants" layer="clothes" />}
      {jacket && <Asset name="b3jacket" layer="clothes" />}
      {jacket ? (
        bottle ? (
          <Asset name="b3bottle_c" layer="clothes" />
        ) : (
          <Asset name="b3arm1_c" layer="clothes" />
        )
      ) : null}
      {cropped_hoodie && <Asset name="b3cropped_hoodie" layer="clothes" />}
      {cropped_hoodie && <Asset name="b3arm1_cropped_hoodie" layer="clothes" />}
    </Expression>
  );
};

export default LindseyThinking;
