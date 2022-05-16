import { HeadingText,TopIconWrapper,GreyText, SearchContainer, HDivider, VaultsContainer, VaultsWrapper, SearchRow, SortByContainer, FilterContainer, TopbarOptions, VaultsTable, VaultsTableTopbar, TopWrapper, SmallTopCard, LargeTopCard, TopbarOption, VaultItem, VDivider } from "./styled";
import FilterIcon from '../../assets/icons/FilterIcon';
import React from 'react';
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import { KeyboardArrowDown } from "@mui/icons-material";
import SearchIcon from "../../assets/icons/SearchIcon";
import SliderIcon from "../../assets/icons/SliderIcon";
import CardIcon from "./assets/CardIcon";
import CalendarIcon from "./assets/CalendarIcon";
import CalendarVertical from "./assets/CalendarVertical";
const Vaults = () => { 
    const [selectedTopbarCategory, setTopbarCategory] = React.useState('Stake');
    const [vaultsValue, setVaultsValue] = React.useState('All Vaults')
    const handleTopbarClick = (event) => {
        let value = event.currentTarget.dataset.value
        setTopbarCategory(value);
    }
    const handleVaultsClick = (event) => {
        let value = event.currentTarget.dataset.value
        setVaultsValue(value);
    }
    return (
        <VaultsWrapper>
            <HeadingText>Vaults</HeadingText>
            <TopWrapper>
                <SmallTopCard>
                    <TopIconWrapper bg='#F5EFD7'>
                        <CardIcon ratio='1.25vw'/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Deposited<GreyText>0</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                <TopIconWrapper bg='#E4DDEF'>
                <CalendarVertical ratio='1.25vw'/>
                </TopIconWrapper>

                <div style={{display: 'flex', flexDirection:'column'}}>Monthly Yield<GreyText>0</GreyText></div>
                </SmallTopCard>
                <SmallTopCard>
                    <TopIconWrapper bg='#D5ECD8'>
                        <CalendarIcon ratio='1.25vw'/>
                    </TopIconWrapper>
                    <div style={{display: 'flex', flexDirection:'column'}}>Daily Yield<GreyText>0</GreyText></div>
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
                        <SortByContainer>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>
                            <FilterIcon color='#333' ratio='0.79vw'/>
                                Sort by:
                            </div>
                            <div style={{paddingTop: '0.4vw'}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
                        </SortByContainer>
                        <FilterContainer>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5vw'}}>

                                <SliderIcon ratio='0.79vw'/>
                                Filter
                            </div>
                            <div style={{paddingTop: '0.4vw'}}>
                                <KeyboardArrowDown color={'#828282'}/>
                            </div>
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
                <HDivider/>
                
            </VaultsTable>
        </VaultsWrapper>
    )
}

export default Vaults;