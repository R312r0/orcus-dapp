import React from 'react';

import LogoIcon from '../../../assets/icons/LogoIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import ShoppingBagIcon from '../../../assets/icons/ShoppingBagIcon';
import {
  AddBtn,
  BuyBtn,
  Divider,
  HDiv,
  IconWrapper,
  LastUpdatedData,
  ORUTableWrapper,
  Text,
  TokenPrice,
  VDiv,
} from './styled';

const ORUTable = () => {
  return (
    <ORUTableWrapper>
      <HDiv>
        <VDiv>
          <IconWrapper>
            <LogoIcon />
          </IconWrapper>
          <Text fontFamily='Montserrat' fontWeight='600' ml='0.260vw'>
            <b>ORU</b>
          </Text>
        </VDiv>
        <TokenPrice>$0.0685324</TokenPrice>
      </HDiv>
      <Divider margin='0.729vw 0' />
      <HDiv>
        <Text>Supply</Text>
        <Text>
          <b>$954.06K</b>
        </Text>
      </HDiv>
      <Divider margin='0.938vw 0 0.781vw 0' />
      <HDiv>
        <Text>Market cap</Text>
        <Text>
          <b>$965.23K</b>
        </Text>
      </HDiv>
      <Divider margin='0.781vw 0 1.719vw 0' />
      <HDiv>
        <AddBtn>
          <PlusIcon />
          Add
        </AddBtn>
        <BuyBtn>
          <ShoppingBagIcon fill='#fff' />
          Buy
        </BuyBtn>
      </HDiv>
      <LastUpdatedData>
        Last updated: 02.18.2022, 10:09:49 AM UTC
      </LastUpdatedData>
    </ORUTableWrapper>
  );
};

export default ORUTable;
