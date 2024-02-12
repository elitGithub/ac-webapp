// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const SpecialGymCarry: React.FC = () => {
  const {
    panties,
    bra,
    skirt,
    jacket,
    face_dazed,
    face_concerned,
    face_teasing,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));

  return (
    <Expression id="lindsey" definitions={data.gym_carry}>
      <Asset name="events/carry/CarryLindsey_Body" layer="base" />
      {face_dazed ? (
        <Asset name="events/carry/CarryLindsey_default" layer="base" />
      ) : face_concerned ? (
        <Asset name="events/carry/CarryLindsey_concerned" layer="base" />
      ) : face_teasing ? (
        <Asset name="events/carry/CarryLindsey_teasing" layer="base" />
      ) : null}

      {panties && (
        <Asset name="events/carry/CarryLindsey_Panty" layer="underwear" />
      )}
      {bra && <Asset name="events/carry/CarryLindsey_Bra" layer="underwear" />}

      {skirt && jacket && (
        <Asset name="events/carry/CarryLindsey_c" layer="clothes" />
      )}
    </Expression>
  );
};

export default SpecialGymCarry;
