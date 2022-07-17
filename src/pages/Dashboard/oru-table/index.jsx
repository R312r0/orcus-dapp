import React, {useEffect, useState} from 'react';

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
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum} from "../../../utils";
import {CONTRACT_ADDRESSES} from "../../../constants";
import logoIcon from "../../../assets/icons/LogoIcon";
import {useNavigate} from "react-router";
import axios from "axios";

const ORUTable = ({data}) => {

    const proxyNavigation = ( link ) => {
      window.open(
        'https://app.arthswap.org/#/swap',
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    const addToken = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: CONTRACT_ADDRESSES.ORU, // The address that the token is at.
                        symbol: "ORU", // A ticker symbol or shorthand, up to 5 chars.
                        decimals: 18, // The number of decimals in the token
                        image:  "https://ibb.co/GppDBSM", // A string url of the token logo
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
    const isMobileScreen = ( ) => {
      let query = window.matchMedia('(max-device-width: 480px)')
      return query.matches
    }

    return (
    <ORUTableWrapper>
      <HDiv>
        { !isMobileScreen() ? 
        <VDiv style={{ justifyContent: isMobileScreen() ? 'center' : '', gap: isMobileScreen() ? '8px' : '', alignItems: isMobileScreen() ? 'center' : ''}}>
          <IconWrapper >
            <LogoIcon />
          </IconWrapper>
          <Text fontFamily='Montserrat' fontWeight='600' ml='0.260vw'>
            <b>ORU</b>
          </Text>
        </VDiv>
         : <></>}
        <TokenPrice>${data ? formattedNum(data.price) : 0}</TokenPrice>
      </HDiv>
      <Divider margin='0.729vw 0' />
      <HDiv>
        <Text>Supply</Text>
        <Text>
          <b>{data ? formattedNum(data.totalSupply) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.938vw 0 0.781vw 0' />
      <HDiv>
        <Text>Market cap</Text>
        <Text>
          <b>${data ? formattedNum(data.marketCap) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.781vw 0 1.719vw 0' />
      <HDiv mt={isMobileScreen() ? '24px': undefined}>
        <AddBtn onClick={() => addToken()}>
          <PlusIcon />
          Add
        </AddBtn>
        <BuyBtn onClick={() => proxyNavigation()}>
          <ShoppingBagIcon fill='#fff' />
          Buy
        </BuyBtn>
      </HDiv>
      <LastUpdatedData>

      </LastUpdatedData>
    </ORUTableWrapper>
  );
};

export default ORUTable;
