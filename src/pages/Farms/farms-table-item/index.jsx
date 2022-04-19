/* eslint-disable no-unused-vars */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';

import DepositingIcon from '../../../assets/icons/DepositingIcon';
import HelpCircleIcon from '../../../assets/icons/HelpCircleIcon';
import LogoIcon from '../../../assets/icons/LogoIcon';
import OUSDIcon from '../../../assets/icons/OUSDIcon';
import {
  ExpandBtn,
  ExpandedData,
  ExpandedDataWrapper,
  FarmsInputContainer,
  FarmsSlider,
  FarmsTableItem,
  HDiv,
  IconWrapper,
  MainData,
  Text,
  VDiv,
  VestingBtn,
  VestRewardsBtn,
  WithdrawBtn,
} from './styled';

const FarmsTableItm = () => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <FarmsTableItem isExpanded={expanded}>
      <MainData>
        <HDiv alignItems='center'>
          <IconWrapper>
            <LogoIcon />
          </IconWrapper>
          <IconWrapper>
            <OUSDIcon />
          </IconWrapper>
          <VDiv ml='0.781vw'>
            <Text>
              <b>ORU/oUSD</b>
            </Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <DepositingIcon />
              <Text fontSize='0.729vw' lineHeight='1.094vw' ml='0.313vw'>
                ArthSwap
              </Text>
            </div>
          </VDiv>
          <IconWrapper ml='8.698vw'>
            <LogoIcon />
          </IconWrapper>
          <Text ml='0.7vw'>
            <b>ORU</b>
          </Text>
          <Text ml='7.813vw' minW='12.552vw'>
            <b>0</b>
          </Text>
          <Text minW='11.979vw'>
            <b>$331,431.91</b>
          </Text>
          <Text>APR</Text>
          <Text ml='0.885vw' minW='11vw'>
            <b>3,531%</b>
          </Text>
          <ExpandBtn
            onClick={() => setExpanded(!expanded)}
            isExpanded={expanded}
          >
            <KeyboardArrowDownIcon />
          </ExpandBtn>
        </HDiv>
      </MainData>
      {expanded ? (
        <ExpandedDataWrapper>
          <ExpandedData>
            <VDiv w='33.021vw'>
              <HDiv>
                <Text ml='0.833vw'>Balance:&nbsp;</Text>
                <Text>
                  <b>0.0&nbsp;</b>
                </Text>
                <Text>ORU/TWR</Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text' value='0' />
                <Text>
                  <b>ORU/TWR</b>
                </Text>
              </FarmsInputContainer>
              <FarmsSlider
                className='range-slider-filter'
                defaultValue={5}
                marks
                step={1}
                min={1}
                max={5}
              />
              <HDiv mt='0.677vw'>
                <Text>
                  <b>0%</b>
                </Text>
                <Text ml='6.354vw'>
                  <b>25%</b>
                </Text>
                <Text ml='6vw'>
                  <b>50%</b>
                </Text>
                <Text ml='5.9vw'>
                  <b>75%</b>
                </Text>
                <Text ml='5.7vw'>
                  <b>100%</b>
                </Text>
              </HDiv>
              <VestingBtn>Deposit</VestingBtn>
              <HDiv mt='2.708vw'>
                <Text>
                  <b>Add Liquidity</b>
                </Text>
                <Text ml='1.875vw'>
                  <b>Remove Liquidity</b>
                </Text>
              </HDiv>
            </VDiv>
            <VDiv w='33.021vw' ml='10.260vw'>
              <HDiv>
                <Text ml='0.833vw'>Balance:&nbsp;</Text>
                <Text>
                  <b>0.0&nbsp;</b>
                </Text>
                <Text>ORU/TWR</Text>
              </HDiv>
              <FarmsInputContainer>
                <input type='text' value='0' />
                <Text>
                  <b>ORU/TWR</b>
                </Text>
              </FarmsInputContainer>
              <FarmsSlider
                className='range-slider-filter'
                defaultValue={5}
                marks
                step={1}
                min={1}
                max={5}
              />
              <HDiv mt='0.677vw'>
                <Text>
                  <b>0%</b>
                </Text>
                <Text ml='6.354vw'>
                  <b>25%</b>
                </Text>
                <Text ml='6vw'>
                  <b>50%</b>
                </Text>
                <Text ml='5.9vw'>
                  <b>75%</b>
                </Text>
                <Text ml='5.7vw'>
                  <b>100%</b>
                </Text>
              </HDiv>
              <WithdrawBtn>Withdraw</WithdrawBtn>
              <HDiv mt='2.240vw' justifyContent='flex-end' alignItems='center'>
                <Text mr='0.573vw'>
                  <b>Rewarsd: 0 ORU</b>
                </Text>
                <HelpCircleIcon />
                <VestRewardsBtn>Harvest Rewards</VestRewardsBtn>
              </HDiv>
            </VDiv>
          </ExpandedData>
        </ExpandedDataWrapper>
      ) : null}
    </FarmsTableItem>
  );
};

export default FarmsTableItm;
