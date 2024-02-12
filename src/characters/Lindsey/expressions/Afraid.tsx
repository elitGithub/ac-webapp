// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseyAfraid: React.FC = () => {
  const {
    slap,
    panties,
    bra,
    towel,
    skirt,
    sweatpants,
    jacket,
    cropped_hoodie,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));

  return (
    <Expression id="lindsey" definitions={data.body3}>
      <Asset name="body3" layer="base" />
      <Asset name="b3arm2_n" layer="base" />
      <Asset name="face_afraid" layer="base" />
      {slap && <Asset name="face_afraid_slap" layer="base" />}

      {panties && <Asset name="b3panty" layer="underwear" />}
      {bra && <Asset name="b3bra" layer="underwear" />}

      {towel && <Asset name="b3towel2" layer="clothes" />}
      {skirt && <Asset name="b3skirt" layer="clothes" />}
      {sweatpants && <Asset name="b3sweatpants" layer="clothes" />}
      {jacket && <Asset name="b3jacket" layer="clothes" />}
      {jacket && <Asset name="b3arm2_c" layer="clothes" />}
      {cropped_hoodie && <Asset name="b3cropped_hoodie" layer="clothes" />}
      {cropped_hoodie && <Asset name="b3arm2_cropped_hoodie" layer="clothes" />}
    </Expression>
  );
};

export default LindseyAfraid;
