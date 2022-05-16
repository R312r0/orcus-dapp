import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import Farms from '../../pages/Farms';
import MintRedeem from '../../pages/MintRedeem';
import ProfitManager from '../../pages/ProfitManager';
import Recollateralize from '../../pages/Recollateralize';
import Staking from '../../pages/Staking';
import SwapPool from '../../pages/SwapPool';
import Vaults from '../../pages/Vaults';

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='mint-redeem' element={<MintRedeem />} />
      <Route path='staking' element={<Staking />} />
      <Route path='farms' element={<Farms />} />
      <Route path='profit-manager' element={<ProfitManager />} />
      <Route path='recollateralize' element={<Recollateralize />} />
      <Route path='vaults' element={<Vaults/>}/>
      {/* <Route path='swap' element={<SwapPool/>} /> */}
    </Routes>
  );
}
