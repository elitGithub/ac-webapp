// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const JoSmile: FC = () => {
  const jo = useAppSelector((state) => state.character.jo);

  return (
    <Expression id="jo" definitions={data.body1}>
      {/* Body */}
      <Asset name="body1" layer="base" />
      <Asset name="b1hair" layer="base" />
      <Asset name="face_smile" layer="base" />

      {jo.equipment.includes('cup') ? (
        <>
          <Asset name="b1tea1_n" layer="base" />
          {jo.equipment.includes('shirt') && (
            <Asset name="b1tea1_c" layer="clothes" />
          )}
        </>
      ) : (
        <>
          <Asset name="b1rightarm1_n" layer="base" />
          <Asset name="b1leftarm1_n" layer="base" />
          {jo.equipment.includes('shirt') && (
            <Asset name="b1arm1_c" layer="clothes" />
          )}
        </>
      )}

      {/* Underwear */}
      {jo.equipment.includes('panties') && (
        <Asset name="b1panty" layer="underwear" />
      )}
      {jo.equipment.includes('bra') && <Asset name="b1bra" layer="underwear" />}

      {/* Clothes */}
      {jo.equipment.includes('glasses') && (
        <Asset name="b1glasses" layer="clothes" />
      )}
      {jo.equipment.includes('pants') && (
        <>
          <Asset name="b1stocking" layer="clothes" />
          <Asset name="b1skirt" layer="clothes" />
        </>
      )}
      {jo.equipment.includes('shirt') && (
        <Asset name="b1blazer" layer="clothes" />
      )}
    </Expression>
  );
};

export default memo(JoSmile);
