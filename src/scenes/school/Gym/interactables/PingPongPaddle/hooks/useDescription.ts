import { useAppSelector } from 'state/hooks';

export const useDescription = () => {
  const state = useAppSelector((state) => ({
    // TODO: Pull out the state you need here
  }));

  return "When I look at these paddles, the only thing I can think of is Mrs. L's ass.\n\nI wouldn't mind bending her over, and giving her a ping pong lesson."; // TODO: return "When I look at these paddles, the only thing I can think of is [mrsl]'s ass.\n\nI wouldn't mind bending her over, and giving her a ping pong lesson.";
};
