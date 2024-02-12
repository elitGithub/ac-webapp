// Libraries
import React from 'react';

// Components
import Interactable, {
  Asset,
  InteractableConfig,
} from 'components/Interactable';

// Definitions
import { useAction } from './hooks/useAction';
import { useDescription } from './hooks/useDescription';

export const PileOfShoes: React.FC<InteractableConfig> = ({ offset }) => {
  const title = 'Pile of Shoes';
  const description = useDescription();
  const action = useAction();

  return (
    <Interactable
      id="pile_of_shoes"
      nameplate={{ title, description }}
      action={action}
      offset={offset}
      render={true}
    >
      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes1.webp"
        offset={{ x: 10, y: 351 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes2.webp"
        offset={{ x: 9, y: 321 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes3.webp"
        offset={{ x: 16, y: 306 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes4.webp"
        offset={{ x: 9, y: 282 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes5.webp"
        offset={{ x: 4, y: 262 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes6.webp"
        offset={{ x: 2, y: 244 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes7.webp"
        offset={{ x: 0, y: 216 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes8.webp"
        offset={{ x: 11, y: 206 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes9.webp"
        offset={{ x: 9, y: 172 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes10.webp"
        offset={{ x: 9, y: 152 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes11.webp"
        offset={{ x: 14, y: 132 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes12.webp"
        offset={{ x: 9, y: 110 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes13.webp"
        offset={{ x: 5, y: 90 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes14.webp"
        offset={{ x: 6, y: 73 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes15.webp"
        offset={{ x: 0, y: 47 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes16.webp"
        offset={{ x: 11, y: 31 }}
      />

      <Asset
        asset="assets/locations/school/first_hall_east/pileofshoes17.webp"
        offset={{ x: 9, y: 0 }}
      />
    </Interactable>
  );
};

export default PileOfShoes;
