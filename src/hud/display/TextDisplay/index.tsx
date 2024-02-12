// Libraries
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'state/hooks';
import classNames from 'classnames';
import './index.scss';

// Context
import { SequenceContext } from 'components/SequenceContext';
import Typewriter from 'components/Typwriter';

export const TextDisplay: React.FC = () => {
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
  const [finishTypwrite, setFinishTypwrite] = useState(false);

  useEffect(() => {
    if (text) {
      setRender(true);
      const timeout = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timeout);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => setRender(false), 50);
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

  const onFinish = () => {
    // On Typewriter finish listener
    setFinishTypwrite(true);
  };

  const handleFinishTypewriter = () => {
    // Stops or finish the typewrite effect
    setFinishTypwrite(true);
  };

  const handleClickText = () => {
    if (finishTypwrite) {
      // Go to next dialogue
      next();
      // Reset the typewriter
      setFinishTypwrite(false);
    } else {
      // Skip the typewrite effect
      handleFinishTypewriter();
    }
  };

  if (!render) return null;

  return (
    <div className={classNames('text-display', { visible })}>
      <button
        className="overlay"
        onClick={() => visible && handleClickText()}
        data-testid="next-text"
      ></button>
      <div className="inner">
        {name && (
          <div className="tag" style={{ background }}>
            {name}
          </div>
        )}
        <Typewriter
          text={textSubbed!}
          typingSpeed={20}
          finish={finishTypwrite}
          onFinish={onFinish}
        />
      </div>
    </div>
  );
};

export default React.memo(TextDisplay);
