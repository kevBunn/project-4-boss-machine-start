import axios from 'axios';
import store from './store/index';
import { setIdeas } from './store/ideas';
import { resetEditingState } from './store/appState';

const ideasEnter = () => {
  store.dispatch(resetEditingState());

  axios.get('http://localhost:4001/api/ideas')
    .then(res => {
      store.dispatch(setIdeas(res.data));
    })
    .catch(console.error);
};

export default ideasEnter;