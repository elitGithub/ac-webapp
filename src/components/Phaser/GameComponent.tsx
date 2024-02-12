import Phaser from 'phaser';
import gameConfig from '../../Phaser/Game';
import { FC, useRef } from 'react';
import useEffectOnce from '../../hooks/useEffectOnce';

const GameComponent: FC = () => {
	const gameContainerRef = useRef<HTMLDivElement>(null);
	useEffectOnce(() => {
		// Create the Phaser game instance
		const game = new Phaser.Game(gameConfig);

		// Append the game canvas as a child of the gameContainerRef
		if (game.canvas) {
			gameContainerRef.current?.appendChild(game.canvas);
		}

		// Clean up the game instance when the component is unmounted
		return () => {
			game.destroy(true);
		};
	});
	return <div id="phaser-container" className="phaser-container" ref={gameContainerRef} />;
}
export default GameComponent;
