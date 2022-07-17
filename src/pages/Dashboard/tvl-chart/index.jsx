import React, {useEffect, useState} from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
    Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { useWindowScale } from '../../../hooks';
import { AreaChartWrapper, DateData, Text, TVLChartWrapper } from './styled';
import {formatDate, formattedNum} from "../../../utils";

const TVLChart = ({chartsArr}) => {
    const currentChartMargin = useWindowScale();

    const isMobileScreen = ( ) => {
        let query = window.matchMedia('(max-device-width: 480px)')
        return query.matches
    }

  return (
    <TVLChartWrapper>
      <Text>TVL</Text>
      <Text>
        <b>$ {chartsArr ? formattedNum(chartsArr[chartsArr.length - 1].value) : null }</b>
      </Text>
        {chartsArr ?
            <AreaChartWrapper>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={chartsArr} margin={ currentChartMargin}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="rgb(180, 180, 180)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgb(180, 180, 180)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke={'#F2F2F2'} />
                        <Tooltip formatter={(value) => formattedNum(value)} />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            dataKey='value'
                            stroke={'#9299B1'}

                            fontSize={isMobileScreen() ? '8px' : '0.429vw'}
                            tickFormatter={(value) => `$${formattedNum(value)}`}
                        />
                        <XAxis
                            width={'100%'}
                            dataKey='time'
                            axisLine={false}
                            tickLine={false}
                            stroke={'#9299B1'}
                            fontSize={isMobileScreen() ? '8px' : '0.429vw'}
                        />
                        <Area
                            type='monotone'
                            strokeWidth={'0.104vw'}
                            dataKey='value'
                            stroke='#767676'
                            fill='url(#colorUv)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </AreaChartWrapper>
            :
            null
        }

    </TVLChartWrapper>
  );
};

export default TVLChart;
