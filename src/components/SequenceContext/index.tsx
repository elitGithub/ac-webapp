// Libraries
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from 'state/hooks';
import type { PayloadAction } from '@reduxjs/toolkit';
import { store } from 'state';

// Actions
import { clearText } from 'state/actions';

export type Sequence = Generator<PayloadAction<any>, void, string | number>;

export const SequenceContext = React.createContext({
  startSequence: (generator: Sequence) => {},
  next: (value?: string) => {},
  previousSequence: () => {}
});

interface SequenceProviderProps {
  children: React.ReactNode;
}

export const SequenceProvider: React.FC<SequenceProviderProps> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const [generator, setGenerator] = useState<Sequence>();
  const [previous, setPrevious] = useState<string[]>([]);

  const run = (generator: Sequence, value?: string) => {
    // Get the next action from the generator
    const { value: action, done } = generator.next(value ? value : '');

    // If the generator is done, clear it
    if (done || !action) {
      setGenerator(undefined);
      dispatch(clearText());
      return;
    }

    // Handle special action types, if applicable
    if (action.type === 'special/pause') {
      setTimeout(() => run(generator), action.payload);
      return;
    } else if (action.type === 'special/get') {
      const state = store.getState();
      setTimeout(() => run(generator, action.payload(state)), 0);
      return;
    }

    // Dispatch the action to state
    dispatch(action);

    // Pause for choice input
    if (action.type === 'display/_choices') return;
    if (action.type === 'display/_text' && action.payload.text !== ' ') return;
    
    if (value !== undefined) {
      setPrevious( current => [value, ...current] )
    }

    setTimeout(() => run(generator), 0);
  };

  const next = (value?: string) => {
    // If we don't have an active generator, there's nothing to do here
    if (!generator) return;

    // Restart the generator
    run(generator, value);
  };

  const startSequence = useCallback(
    (_generator: Sequence) => {
      // Do not allow a new sequence to start if we're still in the middle of one
      if (generator) return;

      // Store a reference to the generator
      setGenerator(_generator);

      // Start the generator
      run(_generator);
    },
    [generator]
  );
  
  // create an array and push the current sequence inside
  const previousSequence = () => {
    console.log("prev: ");
    console.log("prevS: ")
  }

  return (
    <SequenceContext.Provider value={{ startSequence, next, previousSequence }}>
      {children}
    </SequenceContext.Provider>
  );
};
