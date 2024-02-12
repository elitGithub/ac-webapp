// TODO: Rename the component from JoExpression to something, use TitleCase
// TODO: Add assets

// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const CharacterExpression: React.FC = () => {
  const { panties, bra, pants, skirt, shirt, hat, blindfold } = useAppSelector(
    (state) => getEquipment(state.character.flora)
  );

  return (
    <Expression id="flora" definitions={data.body1}>
      {/* TODO: Fill in assets for this expression */}
    </Expression>
  );
};

export default memo(CharacterExpression);
