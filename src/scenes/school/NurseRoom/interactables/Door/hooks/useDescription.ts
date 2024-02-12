import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const nurse = useAppSelector((state) => state.character.nurse.name);

  return `The ${nurse} really should put a lock on this door... but maybe she likes the risk.`;
};
