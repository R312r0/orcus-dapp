import React, {useState, useEffect} from 'react';

import { ProfitManagerWrapper, HeadingText, HistoryHeader, HistoryTableRow,HistoryTableHead,HistoryContainer, HorizontalSpaceBetween, Text,Line, TPPLabel, ProfitManagerHeader, VerticalSpaceBetween,  HistoryContent  } from './styled';
import {formatAddress, formatDate, formattedNum} from "../../utils";
import MRow from './MRow';
import { getTableRowUtilityClass } from '@mui/material';

const  myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const graphql = JSON.stringify({
  query: "query MyQuery {\n  profitManagerItems(orderBy:timestamp_DESC) {\n    id\n    timestamp\n    oruArbitrager\n    oruFromFee\n    oruPenalty\n    timestamp\n    totalInOru\n    totalInUsd\n    usdcFromInvest\n  }\n    investements(orderBy: timestamp_DESC) {\n    id\n    timestamp\n    value\n  }\n}\n",
  variables: {}
})
const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

const ProfitManager = () => {

  const [totalProfit, setTotalProfit] = useState(null);
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    getProfitData();
  }, [])

  const getProfitData = async () => {

    const {data: {profitManagerItems, investements}} = JSON.parse(await (await fetch("http://localhost:4350/graphql", requestOptions)).text())
    let profit = 0;

    const formattedData = profitManagerItems.map((item, _ind) => {
      profit += +(item.totalInUsd)

      const date = formatDate(+item.timestamp);

      return {
        date,
        fee: +item.oruFromFee,
        collateral: investements[_ind].value,
        arbitrager: +item.oruArbitrager,
        penalty: +item.oruPenalty,
        totalORU: +item.totalInOru,
        totalUSD: +item.totalInUsd,
        txHash: item.id
      }

    })

    setTotalProfit(profit);
    setHistoryArray(formattedData)

  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

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
          <TPPLabel> $ {totalProfit ? formattedNum(totalProfit) : 0}  </TPPLabel>
          </div>
        </VerticalSpaceBetween>
      </div>
    </HorizontalSpaceBetween>
    </ProfitManagerHeader>
    <HistoryContainer>
      <HistoryContent  paddingTop='32px'>
        <HistoryHeader>History</HistoryHeader>
        { !isMobileScreen() ? 
        <HistoryTableHead>
          <div>
            Date
          </div>
          <div>
            Fee Collector
          </div>
          <div>
          Collateral Invest
          </div>
          <div>
          Arbitrager
          </div>
          <div>
          Penalty
          </div>
          <div>
          TOTAL in ORU
          </div>
          <div>
          TOTAL in $
          </div>
          <div>
          Tx
          </div>
        </HistoryTableHead>  : <></>}
      </HistoryContent>
        <Line color='#F2F2F2'></Line>
        { !isMobileScreen() ? 
        <HistoryContent mb='16px' paddingTop='0px'>
          {historyArray && historyArray.map(row => {
            return (<HistoryTableRow key={Math.random()}>

              <div>
                  {row.date}
                </div>
                <div>
                  {formattedNum(row.fee)} ORU
                </div>
                <div>
                {formattedNum(row.collateral)} USD
                </div>
                <div>
                {formattedNum(row.arbitrager)} ORU
                </div>
                <div>
                {formattedNum(row.penalty)} ORU
                </div>
                <div>
                {formattedNum(row.totalORU)} ORU
                </div>
                <div>
                {formattedNum(row.totalUSD)} USD
                </div>
                <div>
                  <a href={`https://blockscout.com/astar/tx/${row.txHash}`} target={"_blank"}  style={{color: "black", textDecoration: "none"}}>{formatAddress(row.txHash)} </a>
                </div>
                </HistoryTableRow>);
          })}

        </HistoryContent>
        : <HistoryContent paddingTop='0px'>
        {historyArray && historyArray.map((row, idx) => {
          return (<MRow index={idx} row={row}/>);
        })}

      </HistoryContent> }
    </HistoryContainer>
  </ProfitManagerWrapper>;
};

export default ProfitManager;
