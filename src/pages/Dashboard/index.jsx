/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';

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
import axios from "axios";
import {formatDate} from "../../utils";
import LogoIconBlack from "../../assets/icons/LogoIconBlack";
import USDCIcon from "../../assets/icons/USDCIcon";
import {useBlockChainContext} from "../../context/blockchain-context";

const PAIRS = {
  "0x43783EcE7b46BB026D4CeBfd3e29f539Ff1914fB" : {
    name: "oru-usdc",
  },
  "0xCf83a3d83c1265780d9374e8a7c838fE22BD3DC6" : {
    name: "ousd-usdc",
  },
  "0xE5A11AfBed6a0fC59e69493F7142ef7e454e809f" : {
    name: "ousd-oru",
  }
}

const Dashboard = () => {

  const {contracts} = useBlockChainContext();

  const [activeTab, setActiveTab ] = useState('ORU');

  const [oruData, setOruData] = useState(null)
  const [ousdData, setOusdData] = useState(null)
  const [tvlCharts, setTvlCharts] = useState(null);
  const [protocolTvl, setProtocolTvl] = useState(null);
  const [tcrEcr, setTcrEcr] = useState(null);
  const [stablePairLpPrice, setStablePairLpPrice] = useState(null);

  useEffect(() => {
      getData();
  }, [])

  const getData = async () => {
    const QUERY = JSON.stringify({
      query: `
        query mainData {
                oruById(id: "1") {
                    price
                    totalSupply
                }
                
                ousdById(id: "1") {
                    price
                    totalSupply
                }
                
                tvlCharts(orderBy:currentTimestamp_ASC) {
                    id
                    currentTimestamp
                    value
                }
                bankById(id: "1") {
                    tcr
                    ecr
                }
                farms(orderBy: id_ASC) {
                  id
                  tvl
                  lpToken
                }
                pairs {
                  id
                  lpSupply
                  liquidity
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
    const charts = data.tvlCharts.map(item => {
      return {
        time: formatDate(new Date(+item.currentTimestamp)),
        value: +item.value
      }
    })

    const oru = {
      price: data.oruById.price,
      totalSupply: data.oruById.totalSupply,
      marketCap: data.oruById.totalSupply * data.oruById.price
    }

    const ousd = {
      price: data.ousdById.price,
      totalSupply: data.ousdById.totalSupply,
      marketCap: data.ousdById.totalSupply * data.ousdById.price
    }

    const bank = {
      tcr: data.bankById.tcr,
      ecr: data.bankById.ecr,
    }

    const farmTVL = data.farms.map((item) => {
      const pair = data.pairs.find(p => p.id === PAIRS[item.lpToken].name);
      const lpPrice = pair.liquidity / pair.lpSupply;

      if (pair.id === "ousd-usdc") {
        setStablePairLpPrice(lpPrice)
      }

      return item.tvl * lpPrice;
    }).reduce((p, c) => p + c);

    setOruData(oru);
    setOusdData(ousd);
    setTvlCharts(charts);
    setTcrEcr({tcr: bank.tcr * 100, ecr: bank.ecr * 100})
    setProtocolTvl({pair: charts[charts.length - 1].value, farm: farmTVL, oruPrice: data.oruById.price});
  }

  const isMobileScreen = ( ) => {
    let query = window.matchMedia('(max-device-width: 480px)')
    return query.matches
  }

  return (
    <DashboardWrapper>
      <InfoBlockWrapper>
        <HeadingText>Dashboard</HeadingText>
        <TVLChart chartsArr={tvlCharts}/>
        { isMobileScreen() ? <div style={{paddingLeft: '3%', paddingRight: '3%', paddingTop: '12px', borderTopLeftRadius: '20px', borderTopRightRadius:'20px', backgroundColor: 'white'}}>
          <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('ORU')}
          isActive={activeTab === 'ORU'}
        >
          <ORUIcon ratio='5vw'/>
          ORU
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('oUSD')}
          isActive={activeTab === 'oUSD'}
        >
          <OUSDIcon ratio='5vw'/>
          oUSD
        </ToggleBtn>
      </ToggleBtnWrapper></div>: <></>}
        { isMobileScreen() ? <BuyBlockWrapper>
          { activeTab === 'ORU' ? <ORUTable data={oruData}/> :<OUSDTable data={ousdData}/> }


      </BuyBlockWrapper> : <></>}
        <TableWrapper>
          <ProtocolTable protocolTvl={protocolTvl} />
          <LiquidityTable lpPrice={stablePairLpPrice} />
          <RatioTable tcrEcr={tcrEcr}/>
        </TableWrapper>
      </InfoBlockWrapper>
      { !isMobileScreen() ? <BuyBlockWrapper>
        <ORUTable data={oruData}/>
        <OUSDTable data={ousdData}/>
      </BuyBlockWrapper> : <></> }
    </DashboardWrapper>
  );
};

export default Dashboard;
