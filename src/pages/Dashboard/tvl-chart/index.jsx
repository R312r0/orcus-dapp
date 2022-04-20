import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { useWindowScale } from '../../../hooks';
import { AreaChartWrapper, DateData, Text, TVLChartWrapper } from './styled';
import {formattedNum} from "../../../utils";

const data = [
  { value: 0, xAxis: '05', yAxis: 14000 },
  { value: 10000, xAxis: '06', yAxis: 15000 },
  { value: 1555, xAxis: '07', yAxis: 16000 },
  { value: 12000, xAxis: '08', yAxis: 17000 },
  { value: 4564, xAxis: '09', yAxis: 18000 },
  { value: 17000, xAxis: '10', yAxis: 19000 },

  { value: 5000, xAxis: '11', yAxis: 20000 },
];

const TVLChart = ({protocolTVL}) => {
  const currentChartMargin = useWindowScale();

  return (
    <TVLChartWrapper>
      <Text>TVL</Text>
      <Text>
        <b>$ {protocolTVL ? formattedNum(protocolTVL) : null }</b>
      </Text>
      <DateData>Jul 11, 2021</DateData>
      <AreaChartWrapper>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={currentChartMargin}>
            <CartesianGrid stroke={'#BDBDBD'} />
            <YAxis
              axisLine={false}
              tickLine={false}
              dataKey='yAxis'
              stroke={'#9299B1'}
              fontSize={'0.729vw'}
            />
            <XAxis
              width={'100%'}
              dataKey='xAxis'
              axisLine={false}
              tickLine={false}
              stroke={'#9299B1'}
              fontSize={'0.729vw'}
            />
            <Area
              type='monotone'
              strokeWidth={'0.104vw'}
              dataKey='value'
              stroke='#767676'
              fill='rgba(180, 180, 180, 0.2)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </AreaChartWrapper>
    </TVLChartWrapper>
  );
};

export default TVLChart;
