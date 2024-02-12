// Libraries
import React from 'react';

// Styles
import './index.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
