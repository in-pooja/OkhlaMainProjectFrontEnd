// Layout.js
import React from 'react';
import Sidbaar from './Sidebaar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidbaar />  {/* Sidebar sirf yahan hai */}
      <div style={{ flexGrow: 1, padding: '0px' }}>
        <Outlet />  {/* Yahan route ke components render honge */}
      </div>
    </div>
  );
}

export default Layout;
