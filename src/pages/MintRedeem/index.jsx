import React, {useEffect} from 'react';

import Mint from './mint';
import Redeem from './redeem';
import {
  HeadingText,
  MintRedeemWrapper,
  TabWrapper,
  ToggleBtn,
  ToggleBtnWrapper,
} from './styled';
import axios from "axios";

const MintRedeeem = () => {

  const [activeTab, setActiveTab] = React.useState('Mint');
  const [bankData, setBankData] = React.useState(null);

  useEffect(() => {
      getBankData();
  }, [])

  const getBankData = async () => {

      const QUERY = JSON.stringify({
          query: `
        query mainData {
                bankById(id: "1") {
                    tcr
                    ecr
                }
                oruById(id: "1") {
                    price
                }
                ousdById(id: "1") {
                    price
                }
        }`,
          variables: {}
      });

      const URL = {
          method: 'post',
          url: 'https://app.gc.subsquid.io/beta/orcus/v1-stable/graphql',
          headers: {
              'Content-Type': 'application/json'
          },
          data : QUERY
      };

      const {data: {data}} = await axios(URL);

      setBankData({...data.bankById, oruPrice: data.oruById.price, ousdPrice: data.ousdById.price, tvl: 0});

  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
// 
  return (
    <MintRedeemWrapper>
      <HeadingText>Mint</HeadingText>
      <div style={{backgroundColor: isMobileScreen() ? 'white' : 'inherit', paddingLeft: '3%', paddingRight: '3%'}}>
      <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('Mint')}
          isActive={activeTab === 'Mint'}
        >
          Mint
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('Redeem')}
          isActive={activeTab === 'Redeem'}
        >
          Redeem
        </ToggleBtn>
      </ToggleBtnWrapper>
      </div>
      <TabWrapper>{activeTab === 'Mint' ? <Mint bankData={bankData}/> : <Redeem bankData={bankData}/>}</TabWrapper>
    </MintRedeemWrapper>
  );
};

export default MintRedeeem;
