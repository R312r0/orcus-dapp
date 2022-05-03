/* eslint-disable no-unused-vars */
import React, {useState} from 'react';

import LiquidityTable from './liquidity-table';
import ORUTable from './oru-table';
import OUSDTable from './ousd-table';
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
        { isMobileScreen() ? <div style={{paddingLeft: '8%', paddingRight: '8%', paddingTop: '12px', borderTopLeftRadius: '20px', borderTopRightRadius:'20px', backgroundColor: 'white'}}>
          <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('ORU')}
          isActive={activeTab === 'ORU'}
        >
          ORU
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('oUSD')}
          isActive={activeTab === 'oUSD'}
        >
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
