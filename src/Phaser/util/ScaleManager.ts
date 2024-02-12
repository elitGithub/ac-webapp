import { GAME_HEIGHT } from '../config';

export const calculateScale = (canvasHeight: number) => {
    return canvasHeight / GAME_HEIGHT;

}
