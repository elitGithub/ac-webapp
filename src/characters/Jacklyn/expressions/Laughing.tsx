// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JacklynLaughing: FC = () => {
  const { hat, squidpin, shirt, pants, panties, bra, mask } = useAppSelector(
    (state) => getEquipment(state.character.jacklyn)
  );

  return (
    <Expression id="jacklyn" definitions={data.body2}>
      <Asset name="body2" layer="base" />
      <Asset name="face_laughing" layer="base" />
      {panties && <Asset name="b2panty" layer="underwear" />}
      {bra && <Asset name="b2bra" layer="underwear" />}
      {pants && <Asset name="b2fishnet" layer="base" />}
      {pants && <Asset name="b2skirt" layer="clothes" />}
      {shirt && <Asset name="b2top" layer="clothes" />}
      <Asset name="b2arm2_n" layer="base" />
      {shirt && <Asset name="b2blazer" layer="clothes" />}
      {shirt && <Asset name="b2topblazer" layer="clothes" />}
      {shirt && <Asset name="b2arm2_c" layer="clothes" />}
      {shirt && <Asset name="b2choker" layer="clothes" />}
      {mask && <Asset name="b2gasmask" layer="clothes" />}
      {squidpin && <Asset name="b2badge" layer="clothes" />}
    </Expression>
  );
};

export default memo(JacklynLaughing);
