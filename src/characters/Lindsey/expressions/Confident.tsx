// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const LindseyConfident: React.FC = () => {
  const {
    album,
    keyring,
    keyring_glow,
    panties,
    bra,
    towel,
    skirt,
    sweatpants,
    jacket,
    cropped_hoodie,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));

  return (
    <Expression id="lindsey" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="b1arm2_n" layer="base" />
      {album && <Asset name="b1album" layer="base" />}
      {keyring && <Asset name="b1keyring" layer="base" />}
      {keyring_glow && <Asset name="b1keyring_glow" layer="base" />}
      <Asset name="face_confident" layer="base" />

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {towel && <Asset name="b1towel2" layer="clothes" />}
      {skirt && <Asset name="b1skirt" layer="clothes" />}
      {sweatpants && <Asset name="b1sweatpants" layer="clothes" />}
      {jacket && <Asset name="b1jacket" layer="clothes" />}
      {jacket && <Asset name="b1arm2_c" layer="clothes" />}
      {cropped_hoodie && <Asset name="b1cropped_hoodie" layer="clothes" />}
    </Expression>
  );
};

export default LindseyConfident;
