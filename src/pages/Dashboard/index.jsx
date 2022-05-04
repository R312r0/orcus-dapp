/* eslint-disable no-unused-vars */
import React, {useState} from 'react';

import LiquidityTable from './liquidity-table';
import ORUTable from './oru-table';
import OUSDTable from './ousd-table';
import OUSDIcon from '../../assets/icons/OUSDIcon'
import ProtocolTable from './protocol-table';
import RatioTable from './ratio-table';
import {
  BuyBlockWrapper,
  DashboardWrapper,
  HeadingText,
  InfoBlockWrapper,
  TableWrapper,
  ToggleBtnWrapper,
  ToggleBtn,
} from './styled';
import TVLChart from './tvl-chart';
import ORUIcon from '../../assets/icons/ORUIcon';

const Dashboard = () => {

  const [protocolTVL, setProtocolTVL] = useState(null);
  const [activeTab, setActiveTab ] = useState('ORU');

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  return (
    <DashboardWrapper>
      <InfoBlockWrapper>
        <HeadingText>Dashboard</HeadingText>
        <TVLChart protocolTVL={protocolTVL}/>
        { isMobileScreen() ? <div style={{paddingLeft: '3%', paddingRight: '3%', paddingTop: '12px', borderTopLeftRadius: '20px', borderTopRightRadius:'20px', backgroundColor: 'white'}}>
          <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('ORU')}
          isActive={activeTab === 'ORU'}
        >
          <ORUIcon ratio='5vw'></ORUIcon>
          ORU
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('oUSD')}
          isActive={activeTab === 'oUSD'}
        >
          <OUSDIcon ratio='5vw'></OUSDIcon>
          oUSD
        </ToggleBtn>
      </ToggleBtnWrapper></div>: <></>}
        { isMobileScreen() ? <BuyBlockWrapper>
          { activeTab === 'ORU' ? <ORUTable /> :<OUSDTable /> }
        
        
      </BuyBlockWrapper> : <></>}
        <TableWrapper>
          <ProtocolTable setProtocolTVL={setProtocolTVL} />
          <LiquidityTable />
          <RatioTable />
        </TableWrapper>
      </InfoBlockWrapper>
      { !isMobileScreen() ? <BuyBlockWrapper>
        <ORUTable />
        <OUSDTable />
      </BuyBlockWrapper> : <></> }
    </DashboardWrapper>
  );
};

export default Dashboard;
