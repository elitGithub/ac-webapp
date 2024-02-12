// TODO: Rename the component from JoExpression to something, use TitleCase
// TODO: Add assets

// Libraries
import React, { memo } from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

// Excited expression for character Flora
// rv.append(("flora avatar body1",118,153))
// rv.append(("flora avatar face_excited",244,254))
// if "_panties" in state:
//   rv.append(("flora avatar b1panty",128,825))
// if "_bra" in state:
//   rv.append(("flora avatar b1bra",160,434))
// if "_pants" in state:
//   rv.append(("flora avatar b1pants",117,803))
// elif "_skirt" in state:
//   rv.append(("flora avatar b1skirt",105,716))
// rv.append(("flora avatar b1arm1_n",21,432))
// if "_shirt" in state:
//   if "_skirt" in state:
//     rv.append(("flora avatar b1shirt_knotted",160,417))
//   else:
//     rv.append(("flora avatar b1shirt",139,417))
//   rv.append(("flora avatar b1arm1_c",16,432))
// if "_hat" in state:
//   rv.append(("flora avatar b1chefhat",141,75))
// if "_blindfold" in state:
//   rv.append(("flora avatar b1bandage",0,0))
export const FloraExcited: React.FC = () => {
  const { panties, bra, pants, skirt, shirt, hat, blindfold } = useAppSelector(
    (state) => getEquipment(state.character.flora)
  );

  return (
    <Expression id="flora" definitions={data.body1}>
      <Asset name="body1" layer="base" />
      <Asset name="face_excited" layer="base" />
      <Asset name="b1arm1_n" layer="base" />

      {panties && <Asset name="b1panty" layer="underwear" />}
      {bra && <Asset name="b1bra" layer="underwear" />}

      {pants && <Asset name="b1pants" layer="clothes" />}
      {skirt && <Asset name="b1skirt" layer="clothes" />}

      {shirt && (
        <>
          <Asset name="b1arm1_c" layer="clothes" />
          {skirt ? (
            <Asset name="b1shirt_knotted" layer="clothes" />
          ) : (
            <Asset name="b1shirt" layer="clothes" />
          )}
        </>
      )}

      {hat && <Asset name="b1chefhat" layer="clothes" />}
      {blindfold && <Asset name="b1bandage" layer="clothes" />}
    </Expression>
  );
};

export default memo(FloraExcited);
