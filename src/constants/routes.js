import DashboardIcon from '../assets/icons/navbar/DashboardIcon';
import FarmsIcon from '../assets/icons/navbar/FarmsIcon';
import MintIcon from '../assets/icons/navbar/MintIcon';
import ProfitManagerIcon from '../assets/icons/navbar/ProfitManagerIcon';
import RecollateralizeIcon from '../assets/icons/navbar/RecollateralizeIcon';
import StakingIcon from '../assets/icons/navbar/StakingIcon';
import SwapIcon from '../assets/icons/navbar/SwapIcon';

export const ROUTES = [

  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Mint / Redeem', path: '/mint-redeem', icon: <MintIcon /> },
  { label: 'Staking', path: '/staking', icon: <StakingIcon /> },
  { label: 'Farms', path: '/farms', icon: <FarmsIcon /> },
  { label: 'Profit Manager', path: '/profit-manager', icon: <ProfitManagerIcon /> },
  { label: 'Recollateralize', path: '/recollateralize', icon: <RecollateralizeIcon /> },
  { label: 'Swap', path: '/swap', icon: <SwapIcon />},

];
