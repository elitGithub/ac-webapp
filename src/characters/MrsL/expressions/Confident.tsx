// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const MrsLConfident: React.FC = () => {
  const { panties, bra, shirt, bikini } = useAppSelector((state) =>
    getEquipment(state.character.mrsl)
  );

  return (
    <Expression id="mrsl" definitions={data.body1}>
      {<Asset name="body1" layer="base" />}
      {<Asset name="face_confident" layer="base" />}

      <Asset name="b1arm2_n" layer="base" />

      {bra && <Asset name="b1bra" layer="underwear" />}
      {panties && <Asset name="b1panty" layer="underwear" />}

      {bikini && <Asset name="b1bikini" layer="underwear" />}

      {shirt && <Asset name="b1arm2_c" layer="base" />}
      {shirt && <Asset name="b1corset" layer="clothes" />}
      {shirt && <Asset name="b1dressbraless" layer="clothes" />}
    </Expression>
  );
};

export default memo(MrsLConfident);
