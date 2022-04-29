import React, {useState, useEffect} from 'react';

import { ProfitManagerWrapper, GreyText, HistoryTableRowMobile, HeadingText, HistoryHeader, HistoryTableRow,HistoryTableHead,HistoryContainer, HorizontalSpaceBetween,THRButton, Text,Line, THRValue, THRLabel,THRContainer, TPPLabel, ProfitManagerHeader, VerticalSpaceBetween, THRContent, HistoryContent  } from './styled';
import {formatAddress, formatDate, formattedNum} from "../../utils";
import LogoIconBlack from '../../assets/icons/LogoIconBlack';

const  myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const  graphql = JSON.stringify({
  query: "query MyQuery {\n  profitManagerItems(orderBy:timestamp_DESC) {\n    id\n    timestamp\n    oruArbitrager\n    oruFromFee\n    oruPenalty\n    timestamp\n    totalInOru\n    totalInUsd\n    usdcFromInvest\n  }\n}\n",
  variables: {}
})
const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

const ProfitManager = () => {

  // const [ historyArray ,  ] = useState(
  //     [{date: '2/19/2022', fee: '4,468 ORU', collateral: '0 ORU', arbitrager: '1,121 ORU', penalty: '33,057 ORU', totalORU: '38,645 ORU', totalUSD: '$ 4,048', txHash: '0x7025...edc0'},
  //       {date: '2/19/2022', fee: '4,468 ORU', collateral: '0 ORU', arbitrager: '1,121 ORU', penalty: '33,057 ORU', totalORU: '38,645 ORU', totalUSD: '$ 4,048', txHash: '0x7025...edc0'},]
  // )

  const [totalProfit, setTotalProfit] = useState(null);
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    getProfitData();
  }, [])

  const getProfitData = async () => {

    const {data: {profitManagerItems}} = JSON.parse(await (await fetch("https://app.gc.subsquid.io/beta/orcus/main/graphql", requestOptions)).text())

    let profit = 0;

    const formattedData = profitManagerItems.map(item => {
      profit += +(item.totalInUsd)

      const date = formatDate(+item.timestamp);

      return {
        date,
        fee: +item.oruFromFee,
        collateral: +item.usdcFromInvest,
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
    if(query.matches){
      console.log('match')
      return true;
    }else{
      console.log('no match')
      return false;
    }
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
        <HistoryContent paddingTop='0px'>
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
        {historyArray && historyArray.map(row => {
          return (<HistoryTableRowMobile key={Math.random()}>
              <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
              <LogoIconBlack ratio='5vw'></LogoIconBlack>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div>
                  <b>ORU</b>
                </div>
                  <GreyText>{row.date}</GreyText>
              </div>
              </div>
              <div>
              <div style={{textAlign: 'right'}}>
                <GreyText>
                TOTAL in $
                  </GreyText>
              <div>
              ${formattedNum(row.totalUSD)}
              </div>
              </div>
              </div>
              </HistoryTableRowMobile>);
        })}

      </HistoryContent> }
    </HistoryContainer>
  </ProfitManagerWrapper>;
};

export default ProfitManager;
