/* eslint-disable no-unused-vars */
import React from 'react';

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
} from './styled';
import TVLChart from './tvl-chart';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <InfoBlockWrapper>
        <HeadingText>Dashboard</HeadingText>
        <TVLChart />
        <TableWrapper>
          <ProtocolTable />
          <LiquidityTable />
          <RatioTable />
        </TableWrapper>
      </InfoBlockWrapper>
      <BuyBlockWrapper>
        <ORUTable />
        <OUSDTable />
      </BuyBlockWrapper>
    </DashboardWrapper>
  );
};

export default Dashboard;
