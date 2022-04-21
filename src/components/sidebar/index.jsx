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
} from './styled';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <SidebarWrapper>
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
      <WalletBtn>
        <ConnectedPlugsIcon />
        0xDD1...10aE
      </WalletBtn>
    </SidebarWrapper>
  );
};

export default Sidebar;
