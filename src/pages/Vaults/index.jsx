
import { HeadingText,TopIconWrapper, FilterOverlaySelect, SortByOverlay, SortByOverlayOption, FilterOverlay, LightText,GetBtn, VaultItemContent,FontSize, VaultTableItem,GreyText,VaultTableContent, VaultTableHeader, SearchContainer, HDivider, VaultsContainer, VaultsWrapper, SearchRow, SortByContainer, FilterContainer, TopbarOptions, VaultsTable, VaultsTableTopbar, TopWrapper, SmallTopCard, LargeTopCard, TopbarOption, VaultItem, VDivider } from "./styled";
import FilterIcon from '../../assets/icons/FilterIcon';
import React, { useState } from 'react';

import { KeyboardArrowDown } from "@mui/icons-material";
import SearchIcon from "../../assets/icons/SearchIcon";
import SliderIcon from "../../assets/icons/SliderIcon";
import CardIcon from "./assets/CardIcon";
import CalendarIcon from "./assets/CalendarIcon";
import CalendarVertical from "./assets/CalendarVertical";
import LogoIconBlack from '../../assets/icons/LogoIconBlack';
import BUSDIcon from '../../assets/icons/BUSDIcon'
import USDTIcon from '../../assets/icons/USDTIcon'
import USDCIcon from '../../assets/icons/USDCIcon'
import BCoinIcon from '../../assets/icons/BCoinIcon'

import OUSDIcon from '../../assets/icons/OUSDIcon';
const Vaults = () => { 


    const [selectedTopbarCategory, setTopbarCategory] = React.useState('Stake');
    const [vaultsValue, setVaultsValue] = React.useState('All Vaults')

    const [ isSortByOverlay, setSortByOverlay ] = useState(false);
    const [ isFilterOverlay, setFilterOverlay] = useState(false);

    const handleTopbarClick = (event) => {
        let value = event.currentTarget.dataset.value
        setTopbarCategory(value);
    }
    const handleVaultsClick = (event) => {
        let value = event.currentTarget.dataset.value
        setVaultsValue(value);
    }

    const isMobileScreen = ( ) => {
        let query = window.matchMedia('(max-device-width: 480px)')
        return query.matches
      }
    
    return (
        <VaultsWrapper>
            <HeadingText>Vaults</HeadingText>
            <TopWrapper>
                <SmallTopCard>
                    <TopIconWrapper bg='#F5EFD7'>
                        <CardIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Deposited<GreyText fs={isMobileScreen() ? '14px' : ''}>0</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                <TopIconWrapper bg='#E4DDEF'>
                <CalendarVertical ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                </TopIconWrapper>

                <div style={{display: 'flex', flexDirection:'column'}}>Monthly Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>0</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                    <TopIconWrapper bg='#D5ECD8'>
                        <CalendarIcon ratio={isMobileScreen() ? '20px' : '1.25vw'}/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Daily Yield<GreyText fs={isMobileScreen() ? '14px' : ''}>0</GreyText></div>
                </SmallTopCard>
                <LargeTopCard>
                    <div style={{width: '12.05vw'}}>
                    TVL: <GreyText fs='0.94vw'>$</GreyText>1,68b
                    </div>
                    <VDivider/>
                    <div style={{width: '14.65vw'}}>
                        Vaults: 729
                    </div>
                    <VDivider/>
                    <div style={{width: '20vw'}}>
                    Daily Buyback: <GreyText fs='0.94vw'>$</GreyText> 7,130
                    </div>
                </LargeTopCard>
            </TopWrapper>
            <VaultsTable>
                <VaultsTableTopbar>
                    <TopbarOptions>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Stake'} data-value={'Stake'}>Stake</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Stablecoins'} data-value={'Stablecoins'}>Stablecoins</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Blue Chips'} data-value={'Blue Chips'}>Blue Chips</TopbarOption>
                            <TopbarOption onClick={handleTopbarClick} active={selectedTopbarCategory === 'Orcus Vaults'} data-value={'Orcus Vaults'}>Orcus Vaults</TopbarOption>

                    </TopbarOptions>
                    <div style={{display: "flex", gap: '0.94vw'}}>
                        <SortByContainer active={isSortByOverlay} onClick={() => setSortByOverlay(!isSortByOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                            <FilterIcon color='#333' ratio='0.79vw'/>
                                Sort by:
                            </div>
                            <div style={{transition: '0.1s', transform: isSortByOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isSortByOverlay ? 
                            <SortByOverlay>
                                <SortByOverlayOption>Date</SortByOverlayOption>
                                <SortByOverlayOption>APY</SortByOverlayOption>
                                <SortByOverlayOption>Deposit</SortByOverlayOption>
                                <SortByOverlayOption>TVL</SortByOverlayOption>
                            </SortByOverlay> : <></> }
                        </SortByContainer>
                        <FilterContainer active={isFilterOverlay} onClick={()=> setFilterOverlay(!isFilterOverlay)}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>

                                <SliderIcon ratio='0.79vw'/>
                                Filter
                            </div>
                            <div style={{transition: '0.1s', transform: isFilterOverlay ? 'rotate(180deg)' : ''}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                            { isFilterOverlay ? 
                            <FilterOverlay>
                                Showing 753/1691
                                <FilterOverlaySelect >
                                    <option>Platform: All</option>
                                </FilterOverlaySelect>
                                <FilterOverlaySelect mt={'0.52vw'}>
                                    <option>Vault Type: All</option>
                                </FilterOverlaySelect>
                            </FilterOverlay> : <></> }
                            
                        </FilterContainer>
                    </div>
                </VaultsTableTopbar>
                <SearchRow>
                    <SearchContainer>
                        <input type='text' placeholder='Seach'/>
                        <div>
                            <SearchIcon ratio='0.85vw'/>
                        </div>
                    </SearchContainer>
                    <VaultsContainer>
                        <VaultItem onClick={handleVaultsClick} data-value='All Vaults' active={vaultsValue === 'All Vaults'}>All Vaults</VaultItem>
                        <VaultItem onClick={handleVaultsClick} data-value='Eligible Vaults' active={vaultsValue === 'Eligible Vaults'}>Eligible Vaults</VaultItem>
                        <VaultItem onClick={handleVaultsClick} data-value='My Vaults' active={vaultsValue === 'My Vaults'}>My Vaults</VaultItem>
                    </VaultsContainer>
                </SearchRow>
                <HDivider marginBottom='0'/>
                <VaultTableHeader>
                    <VaultTableContent>
                        <div>Asset</div>
                        <div>Wallet</div>
                        <div>Deposited</div>
                        <div>APY</div>
                        <div>Daily</div>
                        <div>TVL</div>
                        <div></div>
                    </VaultTableContent>
                </VaultTableHeader>
                <HDivider marginTop='0' marginBottom='0'/>
                <VaultTableItem>
                    <VaultItemContent>
                    <div style={{display: 'flex', gap: '1.2vw'}}>
                        <div style={{display: 'flex', gap: '0.87vw'}}>
                            <LogoIconBlack/>
                            <OUSDIcon/>
                        </div>
                        <div>
                            <div>ORU/oUSD</div>
                            <FontSize fs='0.72vw'><LightText>Platform:</LightText> SPOOKYSWAP</FontSize>
                        </div>
                        
                    </div>
                    <div>0</div>
                    <div>0</div>
                    <div>264.78%</div>
                    <div>3,531%</div>
                    <div><GreyText fs='0.93vw'>$</GreyText>1.84b</div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <GetBtn>Get</GetBtn>
                    </div>
                    </VaultItemContent>
                </VaultTableItem>
                <HDivider marginBottom='0' marginTop='0'/>
                <VaultTableItem>
                    <VaultItemContent>
                    <div style={{display: 'flex', gap: '1.2vw'}}>
                        <div style={{display: 'flex', gap: '-0.57vw'}}>
                        <div>
                <BUSDIcon></BUSDIcon>
              </div>
              <div style={{marginLeft: '-1vw'}}>
                <USDTIcon></USDTIcon>
              </div>
              <div style={{marginLeft: '-1vw'}}>
                <USDCIcon></USDCIcon>
              </div>
              <div style={{marginLeft:'-1vw'}}>
                <BCoinIcon></BCoinIcon>
              </div>
              <div style={{marginLeft: '-1vw'}}>
                <OUSDIcon ></OUSDIcon>
              </div>
                        </div>
                        <div>
                            <div>4SRS/oUSD</div>
                            <FontSize fs='0.72vw'><LightText>Platform:</LightText> CURVE</FontSize>
                        </div>
                    </div>
                    <div>0</div>
                    <div>0</div>
                    <div>264.78%</div>
                    <div>3,531%</div>
                    <div><GreyText fs='0.93vw'>$</GreyText>1.84b</div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <GetBtn>Get</GetBtn>
                    </div>
                    </VaultItemContent>
                </VaultTableItem>
                <HDivider marginBottom='0' marginTop='0'/>
                <VaultTableItem>
                    <VaultItemContent>
                    <div style={{display: 'flex', gap: '1.2vw'}}>
                        <div style={{display: 'flex', gap: '0.87vw'}}>
                            <LogoIconBlack/>
                            <OUSDIcon/>
                        </div>
                        <div>
                            <div>ORU/oUSD</div>
                            <FontSize fs='0.72vw'><LightText>Platform:</LightText> SPOOKYSWAP</FontSize>
                        </div>
                        
                    </div>
                    <div>0</div>
                    <div>0</div>
                    <div>264.78%</div>
                    <div>3,531%</div>
                    <div><GreyText fs='0.93vw'>$</GreyText>1.84b</div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <GetBtn>Get</GetBtn>
                    </div>
                    </VaultItemContent>
                </VaultTableItem>

            </VaultsTable>
        </VaultsWrapper>
    )
}

export default Vaults;