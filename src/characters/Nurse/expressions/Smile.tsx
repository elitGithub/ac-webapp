// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const NurseAnnoyed: React.FC = () => {
  const { oil, panties, bra, outfit, shirt, phone, masturbating } =
    useAppSelector((state) => getEquipment(state.character.nurse));

  return (
    <Expression id="nurse" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_smile" layer="base" />

      {oil && <Asset name="b1oil" layer="base" />}

      {outfit && !masturbating && (
        <>
          {phone ? (
            <Asset name="b1arm2_n_phone" layer="base" />
          ) : (
            <Asset name="b1arm2_n" layer="base" />
          )}

          {panties && <Asset name="b1panty" layer="underwear" />}
          {bra && <Asset name="b1bra" layer="underwear" />}

          {shirt && (
            <>
              <Asset name="b1outfit" layer="clothes" />

              {phone ? (
                <Asset name="b1arm2_c_phone" layer="clothes" />
              ) : (
                <Asset name="b1arm2_c" layer="clothes" />
              )}
            </>
          )}
        </>
      )}

      {masturbating && !outfit && (
        <>
          <Asset name="b1arm2_n_vibrator" layer="base" />
          <Asset name="b1openshirt" layer="clothes" />
          <Asset name="b1arm2_c_vibrator" layer="clothes" />
        </>
      )}
    </Expression>
  );
};

export default NurseAnnoyed;
