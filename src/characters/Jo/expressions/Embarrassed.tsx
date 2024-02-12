// Libraries
import React, { FC, memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

// Embarrassed expression for character Jo
// state.startswith("embarrassed"):
//   for slot in self.outfit_slots:
//     state+=getattr(self.equipped(slot),"state_suffix","")
//   rv.append((569,1080))
//   rv.append(("jo avatar body4",101,123))
//   rv.append(("jo avatar b4hair",101,123))
//   rv.append(("jo avatar face_embarrassed",222,205))
//   rv.append(("jo avatar b4glasses",247,277))
//   if "_panties" in state:
//       rv.append(("jo avatar b4panty",130,747))
//   if "_bra" in state:
//       rv.append(("jo avatar b4bra",101,400))
//   if "_pants" in state:
//       rv.append(("jo avatar b4stocking",105,734))
//       rv.append(("jo avatar b4skirt",105,766))
//   rv.append(("jo avatar b4arm2_n",23,319))
//   if "_shirt" in state:
//       rv.append(("jo avatar b4blazer",101,380))
//       rv.append(("jo avatar b4arm2_c",23,319))
export const JoEmbarrassed: FC = () => {
  const { glasses, panties, bra, pants, shirt } = useAppSelector((state) =>
    getEquipment(state.character.jo)
  );

  return (
    <Expression id="jo" definitions={data.body4}>
      <Asset name="body4" layer="base" />
      <Asset name="b4hair" layer="base" />
      <Asset name="face_embarrassed" layer="base" />
      <Asset name="b4arm2_n" layer="base" />

      {panties && <Asset name="b4panty" layer="underwear" />}
      {bra && <Asset name="b4bra" layer="underwear" />}

      {glasses && <Asset name="b4glasses" layer="clothes" />}
      {pants && <Asset name="b4stocking" layer="clothes" />}
      {pants && <Asset name="b4skirt" layer="clothes" />}
      {shirt && <Asset name="b4blazer" layer="clothes" />}
      {shirt && <Asset name="b4arm2_c" layer="clothes" />}
    </Expression>
  );
};

export default memo(JoEmbarrassed);
