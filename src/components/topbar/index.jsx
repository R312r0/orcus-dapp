import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import ConnectedPlugsIcon from '../../assets/icons/ConnectedPlugsIcon';
import LogoIcon from '../../assets/icons/LogoIcon';
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
  WalletBtn,
  TopBarWrapper,
} from './styled';
import {useBlockChainContext} from "../../context/blockchain-context";
import {useWeb3React} from "@web3-react/core";
import {formatAddress} from "../../utils";
import HamburgerIcon from '../../assets/icons/mobileNavbar/HamburgerIcon';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { account } = useWeb3React();
  const { connectWallet } = useBlockChainContext();

  const [ isMenuOpen, setMenuOpen ] = useState(false);


  return (
      <TopBarWrapper>
            <WalletBtn onClick={() => account ? null : connectWallet()}>
          {account ?
                <>
                    <ConnectedPlugsIcon /> {formatAddress(account)}
                </>
               :
          "Connect Wallet"}
      </WalletBtn>
      <LogoWrapper width='10%' height='10%'  onClick={() => navigate(ROUTES[0].path)}>
        <LogoIcon ratio='100px'/>
      </LogoWrapper>
      <LogoText mt='0.573vw'>
        <b>ORCUS</b>
      </LogoText>
      <LogoText style={{ marginBottom: '-0.521vw' }}>FINANCE</LogoText>
      <HamburgerIcon/>
      </TopBarWrapper>
    // <SidebarWrapper>

      /* <LogoWrapper onClick={() => navigate(ROUTES[0].path)}>
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
      </WalletBtn> */
    // </SidebarWrapper>
  );
};

export default Sidebar;
