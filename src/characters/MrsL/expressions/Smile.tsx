// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const MrsLSmile: React.FC = () => {
  const { panties, shirt, bra, bikini } = useAppSelector((state) =>
    getEquipment(state.character.mrsl)
  );

  return (
    <Expression id="mrsl" definitions={data.body4}>
      {<Asset name="body4" layer="base" />}
      {<Asset name="face_smile" layer="base" />}

      {bra && <Asset name="b4bra" layer="underwear" />}
      {panties && <Asset name="b4panty" layer="underwear" />}

      {bikini && <Asset name="b4bikini" layer="underwear" />}

      <Asset name="b4arm2" layer="clothes" />
      {shirt && <Asset name="b4corset" layer="clothes" />}
      {shirt && <Asset name="b4dressbraless" layer="clothes" />}
    </Expression>
  );
};

export default memo(MrsLSmile);
