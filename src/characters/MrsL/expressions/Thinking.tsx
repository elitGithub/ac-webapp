// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const MrsLThinking: React.FC = () => {
  const { panties, shirt, bra, bikini } = useAppSelector((state) =>
    getEquipment(state.character.mrsl)
  );

  return (
    <Expression id="mrsl" definitions={data.body3}>
      {<Asset name="body3" layer="base" />}
      {<Asset name="face_thinking" layer="base" />}

      {bra && <Asset name="b3bra" layer="underwear" />}
      {panties && <Asset name="b3panty" layer="underwear" />}

      {bikini && <Asset name="b3bikini" layer="underwear" />}

      <Asset name="b3arm2" layer="clothes" />
      {shirt && <Asset name="b3corset" layer="clothes" />}
      {shirt && <Asset name="b3dressbraless" layer="clothes" />}
    </Expression>
  );
};

export default memo(MrsLThinking);
