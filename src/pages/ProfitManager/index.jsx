import React, {useState} from 'react';

import { ProfitManagerWrapper, HeadingText, HistoryHeader, HistoryTableRow,HistoryTableHead,HistoryContainer, HorizontalSpaceBetween,THRButton, Text,Line, THRValue, THRLabel,THRContainer, TPPLabel, ProfitManagerHeader, VerticalSpaceBetween, THRContent, HistoryContent  } from './styled';

const ProfitManager = () => {

  const [ historyArray ,  ] = useState([{date: '2/19/2022', fee: '4,468 ORU', collateral: '0 ORU', arbitrager: '1,121 ORU', penalty: '33,057 ORU', totalORU: '38,645 ORU', totalUSD: '$ 4,048', txHash: '0x7025...edc0'},{date: '2/19/2022', fee: '4,468 ORU', collateral: '0 ORU', arbitrager: '1,121 ORU', penalty: '33,057 ORU', totalORU: '38,645 ORU', totalUSD: '$ 4,048', txHash: '0x7025...edc0'},])

  return <ProfitManagerWrapper>
    <ProfitManagerHeader>
    <HorizontalSpaceBetween>
      <div>
        <VerticalSpaceBetween>
          <div>
          <HeadingText>Orcus Profit Manager</HeadingText>
          </div>
          <div>
          <Text>Total Protocol Profit</Text>
          <TPPLabel> Not calculated yet </TPPLabel>
          </div>
        </VerticalSpaceBetween>
      </div>
      {/*<div>*/}
      {/*  <THRContainer>*/}
      {/*    <THRContent>*/}
      {/*      <THRLabel>Total harvested rewards </THRLabel>*/}
      {/*      <Line color='white'></Line>*/}
      {/*      <THRValue>0.0 ORU</THRValue>*/}
      {/*    </THRContent>*/}
      {/*  </THRContainer>*/}
      {/*  <THRButton>*/}
      {/*  Rewards vesting*/}
      {/*  </THRButton>*/}
      {/*  </div>*/}
    </HorizontalSpaceBetween>
    </ProfitManagerHeader>
    <TPPLabel> No data yet </TPPLabel>
    {/*<HistoryContainer>*/}
    {/*  <HistoryContent  paddingTop='32px'>*/}
    {/*    <HistoryHeader>History</HistoryHeader>*/}
    {/*    <HistoryTableHead>*/}
    {/*      <div>*/}
    {/*        Date*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*        Fee Collector*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      Collateral Invest*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      Arbitrager*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      Penalty*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      TOTAL in ORU*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      TOTAL in $*/}
    {/*      </div>*/}
    {/*      <div>*/}
    {/*      Tx*/}
    {/*      </div>*/}
    {/*    </HistoryTableHead>*/}
    {/*  </HistoryContent>*/}
    {/*    <Line color='#F2F2F2'></Line>*/}
    {/*    <HistoryContent paddingTop='0px'>*/}

    {/*      { historyArray.map(row => {*/}
    {/*        return (<HistoryTableRow key={Math.random()}>*/}


    {/*          <div>*/}
    {/*              {row.date}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              {row.fee}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.collateral}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.arbitrager}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.penalty}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.totalORU}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.totalUSD}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*            {row.txHash}*/}
    {/*            </div>*/}
    {/*            </HistoryTableRow>);*/}
    {/*      })}*/}
    {/*      */}
    {/*    </HistoryContent>*/}
    {/*</HistoryContainer>*/}
  </ProfitManagerWrapper>;
};

export default ProfitManager;
