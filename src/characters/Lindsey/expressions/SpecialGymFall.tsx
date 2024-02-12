// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const SpecialGymFall: React.FC = () => {
  const { panties, bra, skirt, jacket } = useAppSelector((state) =>
    getEquipment(state.character.lindsey)
  );

  return (
    <Expression id="lindsey" definitions={data.gym_fall}>
      <Asset name="events/gymfall/LindseyGround_Body" layer="base" />

      {panties && (
        <Asset name="events/gymfall/LindseyGround_Panty" layer="underwear" />
      )}
      {bra && (
        <Asset name="events/gymfall/LindseyGround_Bra" layer="underwear" />
      )}

      {skirt && jacket && (
        <Asset name="events/gymfall/LindseyGround_c" layer="clothes" />
      )}
    </Expression>
  );
};

export default SpecialGymFall;
