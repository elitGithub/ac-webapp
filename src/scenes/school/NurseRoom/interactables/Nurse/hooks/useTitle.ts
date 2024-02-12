import { useAppSelector } from 'state/hooks';

export const useTitle = () => {
  const name = useAppSelector((state) => state.character.nurse.name);

  return name;
};
