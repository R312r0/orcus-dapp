import DashboardIcon from '../assets/icons/navbar/DashboardIcon';
import FarmsIcon from '../assets/icons/navbar/FarmsIcon';
import MintIcon from '../assets/icons/navbar/MintIcon';
import ProfitManagerIcon from '../assets/icons/navbar/ProfitManagerIcon';
import RecollateralizeIcon from '../assets/icons/navbar/RecollateralizeIcon';
import StakingIcon from '../assets/icons/navbar/StakingIcon';
import SwapIcon from '../assets/icons/navbar/SwapIcon';

export const ROUTES = [

  { label: 'Dashboard', path: '/', icon: <DashboardIcon />, mobileIcon: <DashboardIcon ratio='5vw'/> },
  { label: 'Mint / Redeem', path: '/mint-redeem', icon: <MintIcon />, mobileIcon: <MintIcon ratio='5vw'/>},
  { label: 'Staking', path: '/staking', icon: <StakingIcon />, mobileIcon: <StakingIcon ratio='5vw' /> },
  { label: 'Farms', path: '/farms', icon: <FarmsIcon />, mobileIcon:<FarmsIcon ratio='5vw' /> },
  { label: 'Profit Manager', path: '/profit-manager', icon: <ProfitManagerIcon />, mobileIcon:<ProfitManagerIcon ratio='5vw' /> },
  { label: 'Recollateralize', path: '/recollateralize', icon: <RecollateralizeIcon />, mobileIcon:<RecollateralizeIcon ratio='5vw' /> },
  // { label: 'Swap', path: '/swap', icon: <SwapIcon />, mobileIcon:<SwapIcon ratio='5vw' />},

];
