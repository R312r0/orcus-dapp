import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import ConnectedPlugsIcon from '../../assets/icons/ConnectedPlugsIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
import HamburgerIcon from '../../assets/icons/mobileNavbar/HamburgerIcon'
import { ROUTES } from '../../constants';
import {
  ActivePageIndicator,
  IconWrapper,
  LogoText,
  TabLabel,
  TabArrow,
  LogoWrapper,
  PageTab,
  SidebarWrapper,
  TopBarWrapper,
  WalletBtn,
  NavigationWrapper,
  SidebarMenu,
} from './styled';
import {useBlockChainContext} from "../../context/blockchain-context";
import {useWeb3React} from "@web3-react/core";
import {formatAddress} from "../../utils";
import CloseIcon from '../../assets/icons/CloseIcon';

const Sidebar = () => {
  
  const [ isMenu, setMenu ] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { account } = useWeb3React();
  const { connectWallet } = useBlockChainContext();



  const handleOpenMenu = ( ) => {
    setMenu(!isMenu);
  }

  const proxyNavigation = (path) => {
      navigate(path)
      setMenu(false)
  }


  return (
    <NavigationWrapper>
    <TopBarWrapper >
          <ConnectedPlugsIcon ratio={'5vw'} color='#fff'/> 
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
          <div style={{paddingLeft: '13%'}}>
              <LogoIcon width='38px' onClick={() => navigate(ROUTES[0].path)} height='10vw' color='#fff'/>
              </div>
              <LogoText fS='16px' mt='0.873vw'><b>ORCUS</b></LogoText>
              <LogoText fS='8px' style={{marginTop:'1px', marginBottom: '-0.521vw' }}>FINANCE</LogoText>
          </div>
          <div onClick={handleOpenMenu}>
            <HamburgerIcon ratio={'5vw'} />
          </div>
          {
            isMenu ? <SidebarMenu>
              <TopBarWrapper >
            <ConnectedPlugsIcon ratio={'5vw'} color='#fff'/> 
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
              <div style={{paddingLeft: '13%'}}>
              <LogoIcon width='38px' onClick={() => navigate(ROUTES[0].path)} height='10vw' color='#fff'/>
              </div>
              <LogoText fS='16px' mt='0.873vw'><b>ORCUS</b></LogoText>
              <LogoText fS='8px' style={{marginTop:'1px', marginBottom: '-0.521vw' }}>FINANCE</LogoText>
            </div>
            <div onClick={handleOpenMenu}>
                <CloseIcon ratio={'5vw'}></CloseIcon>
            </div>
      </TopBarWrapper>
      <div style={{marginTop: '50px', marginLeft: '40px'}}>
      {ROUTES.map((route, idx) => (
        <div onClick={() => proxyNavigation(route.path)} style={{ fontSize: '18px', marginTop: '24px', marginBottom: '24px', whiteSpace:'nowrap', color:'white', display:'flex', alignItems: 'center', gap: '32px', }} key={idx}>
          <IconWrapper
            isActive={location.pathname === route.path}
          >
          <div>{route.mobileIcon} </div>
          </IconWrapper>
          <div style={{ fontSize:'20px', fontWeight:'500', color: location.pathname === route.path ? 'white' : 'grey'}}>
          {route.label}
          </div>
        </div>
      ))}
      </div>
      
      </SidebarMenu> : <></>
          }
    </TopBarWrapper>
    <SidebarWrapper id='desktopNavigation'>
      <LogoWrapper onClick={() => navigate(ROUTES[0].path)}>
        <LogoIcon />
      </LogoWrapper>
      <LogoText mt='0.573vw'>
        <b>ORCUS</b>
      </LogoText>
      <LogoText style={{ marginBottom: '-0.521vw' }}>FINANCE</LogoText>
      {ROUTES.map((route, idx) => (
        <PageTab key={idx}>
          <div />
          <IconWrapper
            onClick={() => navigate(route.path)}
            isActive={location.pathname === route.path}
          >
            {route.icon}
          </IconWrapper>
          <ActivePageIndicator isActive={location.pathname === route.path} />
          <TabLabel ><TabArrow></TabArrow>{route.label}</TabLabel>
        </PageTab>
      ))}
      <WalletBtn onClick={() => account ? null : connectWallet()}>
          {account ?
                <>
                    <ConnectedPlugsIcon /> {formatAddress(account)}
                </>
               :
          "Connect Wallet"}
      </WalletBtn>
    </SidebarWrapper>
    </NavigationWrapper>
  );
};

export default Sidebar;
