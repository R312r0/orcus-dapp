/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, {useEffect, useState} from 'react';
import {ethers, FixedNumber} from "ethers";
import UNISWAP_PAIR_ABI from '../../../abis/UniswapPair.json';

import CircularProgress from '@mui/material/CircularProgress';
import DepositingIcon from '../../../assets/icons/DepositingIcon';

import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIconBlack from '../../../assets/icons/LogoIconBlack';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import arbABI from '../../../abis/Arbitrager.json';
import {
  ExpandBtn,
  ExpandedData,
  ExpandedDataWrapper,
  AdditionalExpanded,
  AdditionalRow,
  Locked,
  FarmsInputContainer,
  FarmsSlider,
  FarmsTableItem,
  FarmsRow,
  FarmsColumn,
  HDiv,
  IconWrapper,
  MainData,
  Text,
  VDiv,
  VestingBtn,
  VestRewardsBtn,
  ColorfulBtn,
  ColorfulBlock,
  ColorfulBtnContainer,
  HelpCircleContainer,
  MobileFarmsSlider,
  HelpText,
  WithdrawBtn,
  OutlineBtn,
} from './styled';
import {useWeb3React} from "@web3-react/core";
import {useBlockChainContext} from "../../../context/blockchain-context";
import {formattedNum, formatToDecimal} from "../../../utils";
import {CONTRACT_ADDRESSES, MAX_INT, ORU_PER_BLOCK, PROJECT_LOGOS, VAULT_TOKENS} from "../../../constants";
import ArthIcon from '../../../assets/icons/ArthIcon.png'
import pool from "../../SwapPool/pool";
import {useNavigate} from "react-router";
import fromExponential from "from-exponential";
import ProfitControllerABI from '../../../abis/ProfitController.json';
import PlusIcon from '../../../assets/icons/PlusIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';

import Pandora from '../../../assets/icons/Pandora.png';
import { HDivider } from '../styled';
import VaultById from "../../VaultById";

const PERCENTAGES = {
  1: 0,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 1
}

const MobileTableItm = ({item, handleVaultPage}) => {
  const [expanded, setExpanded] = useState(false);
  const {setGlobalVault} = useBlockChainContext();
  const {account} = useWeb3React()
  const navigate = useNavigate();

  const handleNavigate = () => {

    setGlobalVault(item);
    navigate(`/vaults/${item.id}`)

  }

  return (
        <FarmsTableItem isExpanded={expanded}>
          <MainData>
            <FarmsRow>
              {item.Tokens.map(token => {
                  return (
                      <IconWrapper h='20px' w='20px'>
                        {VAULT_TOKENS[token.name].mobileLogo}
                      </IconWrapper>
                  )
              })}
              <VDiv ml='0.781vw'>
                <Text fw='500'>
                  <b>{item.name}</b>
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                  Platform:{PROJECT_LOGOS[item.Project.id.toUpperCase()]} {item.Project.name}
                </div>
              </VDiv>

              <FarmsColumn  style={{flexDirection: 'column', textAlign: 'right', justifyContent: 'end', alignItems: 'end'}}>
                <div style={{fontSize: '10px', color: 'grey'}}>TVL</div>
                <Text>
                  <b>${formattedNum(item.vaultTvl)}</b>
                </Text>
              </FarmsColumn>

              <ExpandBtn onClick={() => setExpanded(!expanded)}isExpanded={expanded}>
                <KeyboardArrowDownIcon style={{width:'4vw', height: '4vw'}}/>
              </ExpandBtn>


            </FarmsRow>
          </MainData>
            {expanded ? (
                <>
                  <AdditionalExpanded>
                    <AdditionalRow>
                      <div>Wallet</div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <b>0</b>
                      </div>
                    </AdditionalRow>
                    <HDivider></HDivider>
                    <AdditionalRow>
                      <div>Deposited</div>
                      <div><b>$ {formattedNum(item.user?.depositedUsd) ?? '0'}</b></div>
                    </AdditionalRow>
                    <HDivider></HDivider>
                    <AdditionalRow>
                      <div>APY</div>
                      <div><b>{formattedNum(item.apy)}%</b></div>
                    </AdditionalRow>
                    <HDivider></HDivider>
                    <AdditionalRow>
                      <div>Daily</div>
                      <div>
                        <b>{formattedNum(item.apy / 365)}%</b></div>
                    </AdditionalRow>
                    <button
                        style={{width: '100%',background: '#333333', border: '1px solid #E0E0E0', borderRadius: '30px', color: 'white', height: '41px'}}
                        onClick={() => handleNavigate()}>
                      {account ? "Get" : "Connect Wallet"}
                    </button>
                  </AdditionalExpanded>
                </>
            ) : null}
        </FarmsTableItem>
  );
};

export default MobileTableItm;
