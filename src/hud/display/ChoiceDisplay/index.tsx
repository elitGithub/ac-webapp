// Libraries
import React, { useContext } from 'react';
import { useAppSelector } from 'state/hooks';
import classNames from 'classnames';
import './index.scss';

// Context
import { SequenceContext } from 'components/SequenceContext';

export const ChoiceDisplay: React.FC = () => {
  const { next } = useContext(SequenceContext);
  const { choices, side, state } = useAppSelector((state) => ({
    choices: state.display.choices,
    side: state.display.choiceSide ?? 'left',
    state,
  }));

  if (!choices) return null;

  return (
    <div className={classNames('choices', { [side]: true })}>
      <ul>
        {choices.map((choice) => (
          <li key={choice.id}>
            <button
              id={`choice-${choice.id}`}
              onClick={() => next(choice.id)}
              disabled={choice.condition ? !choice.condition(state) : false}
            >
              <div className="icon">
                {choice.iconValue && (
                  <span className="icon-value">
                    {typeof choice.iconValue === 'function'
                      ? choice.iconValue(state)
                      : choice.iconValue}
                  </span>
                )}
                {choice.icon && <img src={choice.icon} alt="" />}
              </div>

              {choice.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChoiceDisplay;
