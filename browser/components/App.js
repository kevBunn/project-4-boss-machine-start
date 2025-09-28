import React from 'react'
import Heading from './Heading'
import { Outlet } from 'react-router-dom';

const App = () => (
  <div>
    <Heading />
    <div id="content">
      <Outlet />
    </div>
  </div>
);

export default App;
