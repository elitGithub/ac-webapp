// Libraries
import React from 'react';
import { useAppSelector } from 'state/hooks';
import { getEquipment } from 'state/features/character';

// Components
import Expression, { Asset } from 'components/Expression';

// Data
import data from '../data.json';

export const SpecialClinic: React.FC = () => {
  const {
    panties,
    bra,
    skirt,
    face_angry,
    face_annoyed,
    face_blush,
    face_laughing,
    face_neutral,
    face_scared,
    face_smile,
  } = useAppSelector((state) => getEquipment(state.character.lindsey));
  const nurse = useAppSelector((state) => state.character.nurse);

  return (
    <Expression id="lindsey" definitions={data.clinic}>
      <Asset name="events/clinic/LindseyClinicBG" layer="base" />
      <Asset name="events/clinic/LindseyClinic_Jacket" layer="base" />
      <Asset name="events/clinic/LindseyClinic_Nurse_n" layer="base" />
      {nurse.equipment.includes('face_angry') ? (
        <Asset name="events/clinic/LindseyClinic_Nurse_angry" layer="base" />
      ) : nurse.equipment.includes('face_confused') ? (
        <Asset name="events/clinic/LindseyClinic_Nurse_confused" layer="base" />
      ) : nurse.equipment.includes('face_surprised') ? (
        <Asset
          name="events/clinic/LindseyClinic_Nurse_surprised"
          layer="base"
        />
      ) : null}
      <Asset name="events/clinic/LindseyClinic_Lindsey_Body" layer="base" />
      {face_angry ? (
        <Asset name="events/clinic/LindseyClinic_angry" layer="base" />
      ) : face_annoyed ? (
        <Asset name="events/clinic/LindseyClinic_annoyed" layer="base" />
      ) : face_blush ? (
        <Asset name="events/clinic/LindseyClinic_blush" layer="base" />
      ) : face_laughing ? (
        <Asset name="events/clinic/LindseyClinic_laughing" layer="base" />
      ) : face_neutral ? (
        <Asset name="events/clinic/LindseyClinic_neutral" layer="base" />
      ) : face_scared ? (
        <Asset name="events/clinic/LindseyClinic_scared" layer="base" />
      ) : face_smile ? (
        <Asset name="events/clinic/LindseyClinic_smile" layer="base" />
      ) : null}

      {nurse.equipment.includes('panties') && (
        <Asset
          name="events/clinic/LindseyClinic_Nurse_panty"
          layer="underwear"
        />
      )}
      {panties && (
        <Asset
          name="events/clinic/LindseyClinic_Lindsey_Panty"
          layer="underwear"
        />
      )}
      {nurse.equipment.includes('bra') && (
        <Asset name="events/clinic/LindseyClinic_Nurse_bra" layer="underwear" />
      )}
      {bra && (
        <Asset
          name="events/clinic/LindseyClinic_Lindsey_Bra"
          layer="underwear"
        />
      )}

      {nurse.equipment.includes('outfit') && (
        <Asset name="events/clinic/LindseyClinic_Nurse" layer="clothes" />
      )}
      {skirt && (
        <Asset name="events/clinic/LindseyClinic_Skirt" layer="clothes" />
      )}
    </Expression>
  );
};

export default SpecialClinic;
