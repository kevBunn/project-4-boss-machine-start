import axios from 'axios';

// Action Types
const SET_WORK = 'SET_WORK';
const CREATE_WORK = 'CREATE_WORK';
const UPDATE_WORK = 'UPDATE_WORK';
const DELETE_WORK = 'DELETE_WORK';

// Action Creators
export const setWork = allWork => ({ type: SET_WORK, allWork });
export const addWork = work => ({ type: CREATE_WORK, work });
export const updateWork = work => ({ type: UPDATE_WORK, work });
export const deleteWork = workId => ({ type: DELETE_WORK, workId });

// Thunks
export const createWorkThunk = work => dispatch => {
  axios.post(`http://localhost:4001/api/minions/${work.minionId}/work`, work)
    .then(res => dispatch(addWork(res.data)))
    .catch(console.error);
};

export const updateWorkThunk = work => dispatch => {
  axios.put(`http://localhost:4001/api/minions/${work.minionId}/work/${work.id}`, work)
    .then(res => dispatch(updateWork(res.data)))
    .catch(console.error);
};

export const deleteWorkThunk = work => dispatch => {
  axios.delete(`http://localhost:4001/api/minions/${work.minionId}/work/${work.id}`)
    .then(() => dispatch(deleteWork(work.id)))
    .catch(console.error);
};

// Reducer
const initialState = [];

const workReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_WORK:
      return [...state, action.work];
    case SET_WORK:
      return action.allWork;
    case UPDATE_WORK:
      return state.map(el => el.id === action.work.id ? action.work : el);
    case DELETE_WORK:
      return state.filter(el => el.id !== action.workId);
    default:
      return state;
  }
};

export default workReducer;