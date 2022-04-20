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

const ORUTable = () => {

    const { contracts, liquidity } = useBlockChainContext();
    const [oruInfo, setOruInfo] = useState(null);

    useEffect(() => {

        if (contracts && liquidity) {
            getInfo();
        }

    }, [contracts, liquidity])

    const getInfo = async () => {
        const {ORU} = contracts;

        const oruPrice = liquidity.oruPrice
        const totalSupply = +( await ORU.totalSupply()) / 1e18;
        const marketCap = oruPrice * totalSupply;

        setOruInfo({
            oruPrice,
            totalSupply,
            marketCap
        })
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
        <TokenPrice>${oruInfo ? formattedNum(oruInfo.oruPrice) : 0}</TokenPrice>
      </HDiv>
      <Divider margin='0.729vw 0' />
      <HDiv>
        <Text>Supply</Text>
        <Text>
          <b>${oruInfo ? formattedNum(oruInfo.totalSupply) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.938vw 0 0.781vw 0' />
      <HDiv>
        <Text>Market cap</Text>
        <Text>
          <b>${oruInfo ? formattedNum(oruInfo.marketCap) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.781vw 0 1.719vw 0' />
      <HDiv>
        <AddBtn onClick={() => addToken()}>
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
