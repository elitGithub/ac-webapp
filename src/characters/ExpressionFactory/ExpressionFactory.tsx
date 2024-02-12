import React, { FC, memo } from 'react';

type ExpressionDefinitions = {
	[key: string]: React.ReactNode;
};

type CharacterProps = {
	id: string;
	expressions: ExpressionDefinitions;
};

const ExpressionFactory: FC<CharacterProps> = ({ id, expressions }) => {
	const CharacterComponent: FC = () => {
		// Render the character expressions based on the definitions
		return (
			<>
				{Object.keys(expressions).map((expression) => (
					<div key={expression}>{expressions[expression]}</div>
				))}
			</>
		);
	};

	return <CharacterComponent />;
};

export default memo(ExpressionFactory);
