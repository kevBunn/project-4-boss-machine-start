import axios from 'axios';
import { setSelectedMinion } from './selectedMinion';

// Action Types
const SET_MINIONS = 'SET_MINIONS';
const CREATE_MINION = 'CREATE_MINION';
const UPDATE_MINION = 'UPDATE_MINION';

// Action Creators
export const setMinions = minions => ({ type: SET_MINIONS, minions });
export const addMinion = minion => ({ type: CREATE_MINION, minion });
export const updateMinion = minion => ({ type: UPDATE_MINION, minion });

// Thunks
export const createMinionThunk = (minion, navigate) => dispatch => {
  axios.post('http://localhost:4001/api/minions', minion)
    .then(res => {
      dispatch(addMinion(res.data));
      navigate(`/minions/${res.data.id}`);
    })
    .catch(console.error);
};

export const updateMinionThunk = minion => dispatch => {
  axios.put(`http://localhost:4001/api/minions/${minion.id}`, minion)
    .then(res => {
      dispatch(updateMinion(res.data));
      dispatch(setSelectedMinion(res.data));
    })
    .catch(console.error);
};

export const deleteMinionThunk = minionId => dispatch => {
  axios.delete(`http://localhost:4001/api/minions/${minionId}`)
    .then(() => axios.get(`http://localhost:4001/api/minions`))
    .then(res => dispatch(setMinions(res.data)))
    .catch(console.error);
};

// Reducer
const initialState = [];

const minionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MINION:
      return [...state, action.minion];
    case SET_MINIONS:
      return action.minions;
    case UPDATE_MINION:
      return state.map(el =>
        el.id === action.minion.id ? action.minion : el
      );
    default:
      return state;
  }
};

export default minionsReducer;