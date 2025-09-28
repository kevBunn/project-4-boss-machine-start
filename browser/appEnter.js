import axios from 'axios';
import store from './store/index';
import { setMinions } from './store/minions';
import { setIdeas } from './store/ideas';
import { setMeetings } from './store/meetings';

const appEnter = () => {
  Promise.all([
    axios.get('http://localhost:4001/api/minions'),
    axios.get('http://localhost:4001/api/ideas'),
    axios.get('http://localhost:4001/api/meetings'),
  ])
    .then(([minionsResponse, ideasResponse, meetingsResponse]) => {
      store.dispatch(setMinions(minionsResponse.data));
      store.dispatch(setIdeas(ideasResponse.data));
      store.dispatch(setMeetings(meetingsResponse.data));
    })
    .catch(console.error);
};

export default appEnter;