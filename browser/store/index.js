import { configureStore } from '@reduxjs/toolkit';

// Reducers
import minions from './minions';
import meetings from './meetings';
import ideas from './ideas';
import selectedMinion from './selectedMinion';
import selectedIdea from './selectedIdea';
import work from './work';
import appState from './appState';

const store = configureStore({
  reducer: {
    minions,
    meetings,
    ideas,
    selectedMinion,
    selectedIdea,
    work,
    appState,
  },
  devTools: true,
});

export default store;