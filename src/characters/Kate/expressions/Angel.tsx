// Libraries
import React from 'react';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const KateAngel: React.FC = () => {

  return (
    <Expression id="kate" definitions={data.body5}>
      <Asset name="sprite_nude" layer="base" />
      <Asset name="sprite_clothed" layer="clothes" />
    </Expression>
  );
};

export default KateAngel;
