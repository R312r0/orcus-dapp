import React from 'react';

import Swap from './swap';
import Pool from './pool';
import ArthIcon from '../../assets/icons/ArthIcon.png'
import {
  HeadingText,
  SwapPoolWrapper,
  TabWrapper,
  ToggleBtn,
  ToggleBtnWrapper,
} from './styled';

const SwapPool = () => {


  const [activeTab, setActiveTab] = React.useState('Swap');

  return (
    <SwapPoolWrapper>
      <HeadingText style={{display: 'flex', alignItems: 'center', gap: '0.7vw'}}><img alt='Trade with Arth' style={{height: '26px', width: '26px'}} src={ArthIcon}/>Trade on ArthSwap</HeadingText>
      <ToggleBtnWrapper>
        <ToggleBtn
          onClick={() => setActiveTab('Swap')}
          isActive={activeTab === 'Swap'}
        >
          Swap
        </ToggleBtn>
        <ToggleBtn
          onClick={() => setActiveTab('Pool')}
          isActive={activeTab === 'Pool'}
        >
          Pool
        </ToggleBtn>
      </ToggleBtnWrapper>
      <TabWrapper>{activeTab === 'Swap' ? <Swap /> : <Pool/>}</TabWrapper>
    </SwapPoolWrapper>
  );
};

export default SwapPool;
