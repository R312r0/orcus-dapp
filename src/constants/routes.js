import DashboardIcon from '../assets/icons/navbar/DashboardIcon';
import FarmsIcon from '../assets/icons/navbar/FarmsIcon';
import MintIcon from '../assets/icons/navbar/MintIcon';
import ProfitManagerIcon from '../assets/icons/navbar/ProfitManagerIcon';
import RecollateralizeIcon from '../assets/icons/navbar/RecollateralizeIcon';
import StakingIcon from '../assets/icons/navbar/StakingIcon';
import SwapIcon from '../assets/icons/navbar/SwapIcon';

export const ROUTES = [
  { path: '/', icon: <DashboardIcon /> },
  { path: '/mint-redeem', icon: <MintIcon /> },
  { path: '/staking', icon: <StakingIcon /> },
  { path: '/farms', icon: <FarmsIcon /> },
  { path: '/profit-manager', icon: <ProfitManagerIcon /> },
  { path: '/recollateralize', icon: <RecollateralizeIcon /> },
  { path: '/swap', icon: <SwapIcon />},
];
