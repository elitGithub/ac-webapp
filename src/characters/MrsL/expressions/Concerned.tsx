// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const MrsLConcerned: React.FC = () => {
  const { panties, shirt, bra, bikini } = useAppSelector((state) =>
    getEquipment(state.character.mrsl)
  );

  return (
    <Expression id="mrsl" definitions={data.body2}>
      {<Asset name="body2" layer="base" />}
      {<Asset name="face_concerned" layer="base" />}

      {bra && <Asset name="b2bra" layer="underwear" />}
      {panties && <Asset name="b2panty" layer="underwear" />}

      {bikini && <Asset name="b2bikini" layer="underwear" />}

      <Asset name="b2arm1" layer="clothes" />
      {shirt && <Asset name="b2corset" layer="clothes" />}
      {shirt && <Asset name="b2dressbraless" layer="clothes" />}
    </Expression>
  );
};

export default memo(MrsLConcerned);
