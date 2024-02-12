// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JacklynAngry: FC = () => {
  const { hat, squidpin, shirt, pants, panties, bra } = useAppSelector(
    (state) => getEquipment(state.character.jacklyn)
  );

  return (
    <Expression id="jacklyn" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_angry" layer="base" />
      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}
      {pants && <Asset name="b1fishnet" layer="base" />}
      {pants && <Asset name="b1skirt" layer="clothes" />}
      {shirt && <Asset name="b1top" layer="clothes" />}
      <Asset name="b1arm1_n" layer="base" />
      {shirt && <Asset name="b1blazer" layer="clothes" />}
      {shirt && <Asset name="b1topblazer" layer="clothes" />}
      {shirt && <Asset name="b1arm1_c" layer="clothes" />}
      {shirt && <Asset name="b1choker" layer="clothes" />}
      {squidpin && <Asset name="b1badge" layer="clothes" />}
    </Expression>
  );
};

export default memo(JacklynAngry);
