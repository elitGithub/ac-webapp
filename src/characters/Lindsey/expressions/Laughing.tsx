// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseyLaughing: React.FC = () => {
  const {
    panties,
    bra,
    towel,
    skirt,
    pants,
    sweatpants,
    jacket,
    mc_shirt,
    off_the_shoulder_top,
    cropped_hoodie,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));

  return (
    <Expression id="lindsey" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      <Asset name="b2arm2_n" layer="base" />
      <Asset name="face_laughing" layer="base" />

      {panties && <Asset name="b2panty" layer="underwear" />}
      {bra && <Asset name="b2bra" layer="underwear" />}

      {towel && <Asset name="b2towel2" layer="clothes" />}
      {skirt && <Asset name="b2skirt" layer="clothes" />}
      {pants && <Asset name="b2pants" layer="clothes" />}
      {sweatpants && <Asset name="b2sweatpants" layer="clothes" />}
      {jacket && <Asset name="b2jacket" layer="clothes" />}
      {jacket && <Asset name="b2arm2_c" layer="clothes" />}
      {mc_shirt && <Asset name="b2mc_shirt" layer="clothes" />}
      {mc_shirt && <Asset name="b2arm2_mc_shirt" layer="clothes" />}
      {off_the_shoulder_top && (
        <Asset name="b2off_the_shoulder_top" layer="clothes" />
      )}
      {off_the_shoulder_top && (
        <Asset name="b2arm2_off_the_shoulder_top" layer="clothes" />
      )}
      {cropped_hoodie && <Asset name="b2cropped_hoodie" layer="clothes" />}
      {cropped_hoodie && <Asset name="b2arm2_cropped_hoodie" layer="clothes" />}
    </Expression>
  );
};

export default LindseyLaughing;
