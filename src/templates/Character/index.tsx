// TODO: Rename the character (two locations)
// TODO: Import all the expressions and provide them to the <Character /> component
// TODO: Define all the coords in data.json
// TODO: Setup expressions in expressions/
// TODO: Delete these TODO lines as you complete them

// Libraries
import React from 'react';

// Components
import Character from 'components/Character';

// Expressions
import JoFlirty from './expressions/Flirty';

export const Jo: React.FC = () => {
  return (
    <Character
      id="jo"
      expressions={{
        flirty: <JoFlirty />,
      }}
    />
  );
};

export default Jo;
