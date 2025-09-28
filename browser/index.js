import React from 'react';
import ReactDOM from 'react-dom/client'; // ← this is the key change
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from './store/index';

import App from './components/App';
import AllMinions from './components/AllMinions';
import Home from './components/Home';
import AllIdeas from './components/AllIdeas';
import IdeaWithParams from './components/IdeaWithParams';
import MinionWithParams from './components/MinionWithParams';

const root = ReactDOM.createRoot(document.getElementById('app')); // ← new API

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="minions" element={<AllMinions />} />
          <Route path="minions/:minionId" element={<MinionWithParams />} />
          <Route path="ideas" element={<AllIdeas />} />
          <Route path="ideas/:ideaId" element={<IdeaWithParams />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);