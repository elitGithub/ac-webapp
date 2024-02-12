// Libraries
import React, { FC, memo } from 'react';

// Styles
import './index.scss';

interface XrayBarProps {
  xrayState?: string;
}

export const XrayBar: FC<XrayBarProps> = ({ xrayState }) => {
  return (
    <div className="capitalize">
      {xrayState}
    </div>
  );
};

export default memo(XrayBar);
