import React, { useEffect } from 'react';

function useEffectOnce(effect: React.EffectCallback) {
  useEffect(effect, []);
}

export default useEffectOnce;
