// Libraries
import React, { useContext } from 'react';
import './index.scss';

// Context
import { ExpressionProvider } from './context/ExpressionContext';
import { ScaleContext } from 'components/ScaleContext';

// Types
import { CharactersState } from 'state/features/character';

export interface AssetDefinition {
  [key: string]: {
    x: number;
    y: number;
    z: number;
  };
}

interface ExpressionProps {
  id: keyof CharactersState;
  definitions: AssetDefinition;
  children: React.ReactNode;
}

export const Expression: React.FC<ExpressionProps> = ({
  id,
  definitions,
  children,
}) => {
  const scale = useContext(ScaleContext);

  return (
    <div
      className="expression"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <ExpressionProvider id={id} definitions={definitions}>
        {children}
      </ExpressionProvider>
    </div>
  );
};

export * from './Asset';

export default Expression;
