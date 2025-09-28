import axios from 'axios';
import { setSelectedIdea } from './selectedIdea';

// Action Types
const SET_IDEAS = 'SET_IDEAS';
const CREATE_IDEA = 'CREATE_IDEA';
const UPDATE_IDEA = 'UPDATE_IDEA';

// Action Creators
export const setIdeas = ideas => ({ type: SET_IDEAS, ideas });
export const createIdea = idea => ({ type: CREATE_IDEA, idea });
export const updateIdea = idea => ({ type: UPDATE_IDEA, idea });

// Thunks
export const createIdeaThunk = idea => dispatch => {
  axios.post('http://localhost:4001/api/ideas', idea)
    .then(res => res.data)
    .then(createdIdea => {
      dispatch(createIdea(createdIdea));
    })
    .catch(console.error);
};

export const updateIdeaThunk = idea => dispatch => {
  axios.put(`http://localhost:4001/api/ideas/${idea.id}`, idea)
    .then(res => res.data)
    .then(updatedIdea => {
      dispatch(updateIdea(updatedIdea));
      dispatch(setSelectedIdea(updatedIdea));
    })
    .catch(console.error);
};

// Reducer
const initialState = [];

const ideasReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_IDEA:
      return [...state, action.idea];
    case SET_IDEAS:
      return action.ideas;
    case UPDATE_IDEA:
      return state.map(el =>
        el.id === action.idea.id ? action.idea : el
      );
    default:
      return state;
  }
};

export default ideasReducer;