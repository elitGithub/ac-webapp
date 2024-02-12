// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const IsabelleExcited: React.FC = () => {
  const { spinach, glasses, panties, bra, pants, shirt, holdingpanties } =
    useAppSelector((state) => getEquipment(state.character.isabelle));

  return (
    <Expression id="isabelle" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_excited" layer="base" />
      {glasses && <Asset name="b1glasses" layer="base" />}

      {spinach ? (
        <>
          {holdingpanties ? (
            <>
              <Asset name="b1arm3_panties_n" layer="base" />
              <Asset name="b1arm3_spinach_n" layer="base" />
            </>
          ) : (
            <Asset name="b1arm3_n" layer="base" />
          )}
        </>
      ) : (
        <Asset name="b1arm1_n" layer="base" />
      )}

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {shirt && <Asset name="b1tucked" layer="clothes" />}
      {pants && <Asset name="b1pants" layer="clothes" />}

      {shirt && (
        <>
          {spinach ? (
            <>
              {holdingpanties ? (
                <>
                  <Asset name="b1arm3_spinach_c" layer="clothes" />
                  <Asset name="b1arm3_panties_c" layer="clothes" />
                </>
              ) : (
                <Asset name="b1arm3_c" layer="clothes" />
              )}
            </>
          ) : (
            <Asset name="b1arm1_c" layer="clothes" />
          )}
        </>
      )}
    </Expression>
  );
};

export default memo(IsabelleExcited);
