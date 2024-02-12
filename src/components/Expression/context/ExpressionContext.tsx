// Libraries
import React from 'react';
import { CharactersState } from 'state/features/character';
import type { AssetDefinition } from '../';

interface ExpressionContextData {
  id: keyof CharactersState;
  definitions: AssetDefinition;
}

export const ExpressionContext = React.createContext<ExpressionContextData>({
  id: 'mc',
  definitions: {},
});

interface ExpressionProviderProps {
  id: keyof CharactersState;
  definitions: AssetDefinition;
  children: React.ReactNode;
}

export const ExpressionProvider: React.FC<ExpressionProviderProps> = ({
  id,
  definitions,
  children,
}) => {
  return (
    <ExpressionContext.Provider value={{ id, definitions }}>
      {children}
    </ExpressionContext.Provider>
  );
};
