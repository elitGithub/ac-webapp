import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({}));
  return 'Ah! A perfect depiction of a polar bear eating sugar on an iceberg in a snowstorm. True art.';
  // if kate_search_for_nurse.started:
  // return "An accurate depiction of a dove carrying a letter through a cloud. Very artistic."
};
