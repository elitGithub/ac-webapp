// TODO: Rename the component from JoExpression to something, use TitleCase
// TODO: Add assets

// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoExpression: FC = () => {
  const jo = useAppSelector((state) => state.character.jo);

  return (
    <Expression id="jo" definitions={data.body1}>
      {/* TODO: Fill in assets for this expression */}
    </Expression>
  );
};

export default memo(JoExpression);
