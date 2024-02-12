// Libraries
import React, { useState, useEffect, memo, FC } from 'react';
import classNames from 'classnames';
import { useAppSelector } from 'state/hooks';
import './index.scss';

// Types
import { CharactersState, Expression } from 'state/features/character';

interface Character {
  id: keyof CharactersState;
  expressions?: {
    [key in Expression]?: React.ReactNode | undefined;
  };
}


export const Character: FC<Character> = ({ id, expressions }) =>  {
  const { character, inScene } = useAppSelector((state) => ({
    character: state.character[id],
    inScene: state.character.current.includes(id),
  }));

  const [prevExpr, setPrevExpr] = useState<Expression>();
  const [expression, setExpression] = useState<Expression>(character.expression);
  const [visible, setVisible] = useState(false);
  const [prevVisible, setPrevVisible] = useState(true);
  const [position, setPosition] = useState(`${character.position * 100}vw`);
  const [instant, setInstant] = useState(false);

  useEffect(() => {

    const asyncFunc = async () => {
      if (inScene && expression !== character?.expression) {
        await setPrevVisible(true);
        await setPrevExpr(expression);
        await setInstant(true);
        await setVisible(false);

        setExpression(character.expression);
      }
    }
    asyncFunc();

    return () => {
      setInstant(false);
      setVisible(true);
      setPrevVisible(false);
      setPrevExpr('');
    }
  }, [inScene, expression, character.expression]);

  useEffect(() => {
    if (inScene) {
      setVisible(true);
      setPosition(`${character.position * 100}vw`);
    } else {
      setVisible(false);
    }
  }, [inScene, character.position]);

  if (!visible || !expressions) return null;

  return (
    <div className="character-wrap" style={{ left: position }}>
      <div
        className={classNames('character', {
          visible: prevVisible,
          fadeOut: prevVisible && !instant,
          flip: !!character.modifiers.flip,
        })}
      >
        {prevExpr && (expressions?.[prevExpr] as React.ReactNode)}
      </div>
      <div
        className={classNames('character', {
          visible,
          instant,
          flip: !!character.modifiers.flip,
        })}
      >
        {(expressions?.[expression] as React.ReactNode) ?? null}
      </div>
    </div>
  );

};

export default memo(Character);
