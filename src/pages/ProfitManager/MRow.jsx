import React from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { formatAddress, formatDate, formattedNum } from "../../utils";
import { ExpandBtn, GreyText, HistoryTableRowMobile } from "./styled";

import LogoIconBlack from "../../assets/icons/LogoIconBlack";

const MRow = ({ index, row }) => {
  const [expanded, setExpanded] = React.useState(false);
  console.log(row);
  return (
    <>
      <HistoryTableRowMobile key={Math.random()}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <LogoIconBlack ratio="5vw"></LogoIconBlack>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <b>ORU</b>
            </div>
            <GreyText>{formatDate(row.date)}</GreyText>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ textAlign: "right" }}>
              <GreyText>TOTAL in $</GreyText>
              <div>${formattedNum(row.totalUSD)}</div>
            </div>
          </div>
          <ExpandBtn
            onClick={() => setExpanded(!expanded)}
            isExpanded={expanded}
          >
            <KeyboardArrowDownIcon />
          </ExpandBtn>
        </div>
      </HistoryTableRowMobile>
      {expanded ? (
        <>
          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>Fee Collector</GreyText>
            </div>

            <div style={{ marginRight: "8px" }}>
              {formattedNum(row.fee)} ORU
            </div>
          </HistoryTableRowMobile>
          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>Collateral Invest</GreyText>
            </div>
            <div style={{ marginRight: "8px" }}>
              {formattedNum(row.collateral)} USD
            </div>
          </HistoryTableRowMobile>

          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>Arbitrager</GreyText>
            </div>

            <div style={{ marginRight: "8px" }}>
              {formattedNum(row.arbitrager)} ORU
            </div>
          </HistoryTableRowMobile>
          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>Penalty</GreyText>
            </div>

            <div style={{ marginRight: "8px" }}>
              {formattedNum(row.penalty)} ORU
            </div>
          </HistoryTableRowMobile>

          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>TOTAL in ORU</GreyText>
            </div>

            <div style={{ marginRight: "8px" }}>
              {formattedNum(row.totalORU)} ORU
            </div>
          </HistoryTableRowMobile>

          <HistoryTableRowMobile mt="0px">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "5vw" }}></div>
              <GreyText>Tx</GreyText>
            </div>
            <div
              style={{
                maxWidth: "35%",
                marginRight: "8px",
                overflow: "hidden",
              }}
            >
              <a
                href={`https://blockscout.com/astar/tx/${row.txHash}`}
                target={"_blank"}
                style={{ color: "black", textDecoration: "none" }}
              >
                {formatAddress(row.txHash)}{" "}
              </a>
            </div>
          </HistoryTableRowMobile>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MRow;
