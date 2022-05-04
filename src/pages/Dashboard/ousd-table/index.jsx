import React, {useEffect, useState} from 'react';

import OUSDIcon from '../../../assets/icons/OUSDIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import ShoppingBagIcon from '../../../assets/icons/ShoppingBagIcon';
import {
  AddBtn,
  BuyBtn,
  Divider,
  HDiv,
  IconWrapper,
  LastUpdatedData,
  OUSDTableWrapper,
  Text,
  TokenPrice,
  VDiv,
} from './styled';
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum} from "../../../utils";
import {CONTRACT_ADDRESSES} from "../../../constants";
import {useNavigate} from "react-router";
import UnwrappedOUSDIcon from '../../../assets/icons/UnwrappedOUSDIcon';

const OUSDTable = () => {

    const { contracts, liquidity } = useBlockChainContext();
    const [ousdInfo, setOusdInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        if (contracts && liquidity) {
            getInfo();
        }

    }, [contracts, liquidity])

    const getInfo = async () => {
        const {OUSD} = contracts;

        const ousdPrice = liquidity.ousdPrice;
        const totalSupply = +( await OUSD.totalSupply()) / 1e18;
        const marketCap = ousdPrice * totalSupply;

        setOusdInfo({
            ousdPrice,
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
                        address: CONTRACT_ADDRESSES.OUSD, // The address that the token is at.
                        symbol: "oUSD", // A ticker symbol or shorthand, up to 5 chars.
                        decimals: 18, // The number of decimals in the token
                        image: "https://drive.google.com/file/d/1KC1FgK-8gpfEjnzDvxAAzQO3FJ5N2Vyo/view?usp=sharing", // A string url of the token logo
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
    const proxyNavigation = ( link ) => {
      window.open(
        'https://app.arthswap.org/#/swap',
        '_blank' // <- This is what makes it open in a new window.
      );
    }

  return (
    <OUSDTableWrapper>
      <HDiv>
        { !isMobileScreen() ? 
      <VDiv style={{ justifyContent: isMobileScreen() ? 'center' : '', gap: isMobileScreen() ? '4px' : '', alignItems: isMobileScreen() ? 'center' : ''}}>

            <UnwrappedOUSDIcon ratio={isMobileScreen() ? '5.344vw' : undefined }/>
          <Text
            fontFamily='Montserrat'
            fontWeight='600'

          >
            <b>oUSD</b>
          </Text>
        </VDiv> : <></>
        }
        <TokenPrice>${ousdInfo ? formattedNum(ousdInfo.ousdPrice) : 0}</TokenPrice>
      </HDiv>
      <Divider margin='0.729vw 0' />
      <HDiv>
        <Text>Supply</Text>
        <Text>
          <b>{ousdInfo ? formattedNum(ousdInfo.totalSupply) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.938vw 0 0.781vw 0' />
      <HDiv>
        <Text>Market cap</Text>
        <Text>
          <b>${ousdInfo ? formattedNum(ousdInfo.marketCap) : 0}</b>
        </Text>
      </HDiv>
      <Divider margin='0.781vw 0 1.719vw 0' />
      <HDiv mt={isMobileScreen() ? '24px': undefined}>
        <AddBtn onClick={() => addToken()}>
          <PlusIcon />
          Add
        </AddBtn>
        <BuyBtn onClick={()  => proxyNavigation()}>
          <ShoppingBagIcon fill='#fff'/>
          Buy
        </BuyBtn>
      </HDiv>
      <LastUpdatedData>
      </LastUpdatedData>
    </OUSDTableWrapper>
  );
};

export default OUSDTable;
