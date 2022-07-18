import React, {useEffect} from 'react';

import Stake from './stake';
import {
  HeadingText,
  StakingWrapper,
  TabWrapper,
  ToggleBtn,
  ToggleBtnWrapper,
} from './styled';
import Unstake from './unstake';
import axios from "axios";

const MintRedeeem = () => {
  const [activeTab, setActiveTab] = React.useState('Stake');
  const [stakingData, setStakingData] = React.useState(null);

  useEffect(() => {
      getData();
  }, [])

  const getData = async () => {
      const QUERY = JSON.stringify({
          query: `
            query mainData {
                oruById(id: "1") {
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

      setStakingData(data.oruById.price);
  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }
  return (
    <StakingWrapper>
      <HeadingText>Staking</HeadingText>
      
      <div style={{backgroundColor: isMobileScreen() ? 'white' : 'inherit', paddingLeft: '3%', paddingRight: '3%'}}>
      <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('Stake')}
          isActive={activeTab === 'Stake'}
        >
          Stake
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('Unstake')}
          isActive={activeTab === 'Unstake'}
        >
          Unstake
        </ToggleBtn>
      </ToggleBtnWrapper>
      </div>
      <TabWrapper>{activeTab === 'Stake' ? <Stake stakingData={stakingData}/> : <Unstake stakingData={stakingData}/>}</TabWrapper>
    </StakingWrapper>
  );
};

export default MintRedeeem;
