// Libraries
import React, { FC, memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'state/hooks';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import './index.scss';

// Context
import { SequenceContext } from 'components/SequenceContext';

export const TextDisplay: FC = () => {
  const { next } = useContext(SequenceContext);
  const { text, name, background, characters } = useAppSelector((state) => ({
    text: state.display.text,
    name: state.display.speaker && state.character[state.display.speaker].name,
    background:
      state.display.speaker &&
      state.character[state.display.speaker].background,
    characters: Object.entries(state.character).reduce(
      (characters, [key, value]) => ({
        ...characters,
        [key]: value.name,
      }),
      {}
    ),
  }));
  const [render, setRender] = useState(!!text);
  const [visible, setVisible] = useState(!!text);

  useEffect(() => {
    if (text) {
      setRender(true);
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setRender(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  const textSubbed = useMemo(() => {
    let subbed = text;
    const matches = subbed?.matchAll(/\[([a-z]*)\]/g) ?? [];
    for (const match of matches) {
      subbed = subbed?.replace(
        match[0],
        characters[match[1] as keyof typeof characters]
      );
    }

    return subbed;
  }, [text, characters]);

  if (!render) return null;

  return (
    <div className={classNames('text-display', { visible })}>
      <button
        className="overlay"
        onClick={() => visible && next()}
        data-testid="next-text"
      ></button>
      <div className="inner">
        {name && (
          <div className="tag" style={{ background }}>
            {name}
          </div>
        )}
        {textSubbed && <ReactMarkdown>{textSubbed}</ReactMarkdown>}
      </div>
    </div>
  );
};

export default TextDisplay;
