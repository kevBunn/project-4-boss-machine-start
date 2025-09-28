// Action Types
const SET_MINION = 'SET_MINION';
const CLEAR_SELECTED_MINION = 'CLEAR_SELECTED_MINION';

// Action Creators
export const setSelectedMinion = minion => ({ type: SET_MINION, minion });
export const clearSelectedMinion = () => ({ type: CLEAR_SELECTED_MINION });

// Initial State
const initialState = {
  id: '',
  name: '',
  age: '',
  salary: '',
  weaknesses: '',
};

// Reducer
const selectedMinionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MINION:
      return action.minion;
    case CLEAR_SELECTED_MINION:
      return { ...initialState };
    default:
      return state;
  }
};

export default selectedMinionReducer;