import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { useWindowScale } from "../../../hooks";
import { AreaChartWrapper, DateData, Text, TVLChartWrapper } from "./styled";
import { formatDate, formattedNum } from "../../../utils";

const data = [
  { value: 0, xAxis: "05", yAxis: 14000 },
  { value: 10000, xAxis: "06", yAxis: 15000 },
  { value: 1555, xAxis: "07", yAxis: 16000 },
  { value: 12000, xAxis: "08", yAxis: 17000 },
  { value: 4564, xAxis: "09", yAxis: 18000 },
  { value: 17000, xAxis: "10", yAxis: 19000 },

  { value: 5000, xAxis: "11", yAxis: 20000 },
];

const TVLChart = ({ protocolTVL }) => {
  const currentChartMargin = useWindowScale();

  const [chartsArr, setChartsArr] = useState(null);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const graphql = JSON.stringify({
    query:
      "query MyQuery {\n  tvlCharts(orderBy:currentTimestamp_ASC) {\n    id\n    currentTimestamp\n    value\n  }\n}",
    variables: {},
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data: tvlCharts } = JSON.parse(
        await (
          await fetch(
            "https://app.gc.subsquid.io/beta/orcus/main/graphql",
            requestOptions
          )
        ).text()
      );
      const chart = tvlCharts.tvlCharts.map((item) => {
        return {
          time: formatDate(new Date(+item.currentTimestamp)),
          value: +item.value,
        };
      });

      setChartsArr(chart);
    } catch (e) {
      console.log(e.message);
    }
  };
  const isMobileScreen = () => {
    let query = window.matchMedia("(max-device-width: 480px)");
    return query.matches;
  };

  return (
    <TVLChartWrapper>
      <Text>TVL</Text>
      <Text>
        <b>$ {protocolTVL ? formattedNum(protocolTVL) : null}</b>
      </Text>
      {chartsArr ? (
        <AreaChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartsArr} margin={currentChartMargin}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="rgb(180, 180, 180)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="rgb(180, 180, 180)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={"#F2F2F2"} />
              <Tooltip formatter={(value) => formattedNum(value)} />
              <YAxis
                axisLine={false}
                tickLine={false}
                dataKey="value"
                stroke={"#9299B1"}
                fontSize={isMobileScreen() ? "8px" : "0.429vw"}
                tickFormatter={(value) => `$${formattedNum(value)}`}
              />
              <XAxis
                width={"100%"}
                dataKey="time"
                axisLine={false}
                tickLine={false}
                stroke={"#9299B1"}
                fontSize={isMobileScreen() ? "8px" : "0.429vw"}
              />
              <Area
                type="monotone"
                strokeWidth={"0.104vw"}
                dataKey="value"
                stroke="#767676"
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </AreaChartWrapper>
      ) : null}
    </TVLChartWrapper>
  );
};

export default TVLChart;
