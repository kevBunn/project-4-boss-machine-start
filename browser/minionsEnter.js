import axios from 'axios';
import store from './store/index';
import { setMinions } from './store/minions';
import { resetEditingState } from './store/appState';

const minionsEnter = () => {
  store.dispatch(resetEditingState());

  axios.get('http://localhost:4001/api/minions')
    .then(res => {
      store.dispatch(setMinions(res.data));
    })
    .catch(console.error);
};

export default minionsEnter;