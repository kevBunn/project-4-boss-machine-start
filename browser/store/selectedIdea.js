// Action Types
const CLEAR_SELECTED_IDEA = 'CLEAR_SELECTED_IDEA';
const SET_IDEA = 'SET_IDEA';

// Action Creators
export const setSelectedIdea = idea => ({ type: SET_IDEA, idea });
export const clearSelectedIdea = () => ({ type: CLEAR_SELECTED_IDEA });

// Initial State
const initialState = {
  id: '',
  name: '',
  weeklyRevenue: 0,
  numWeeks: 0,
};

// Reducer
const selectedIdeaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_SELECTED_IDEA:
      return { ...initialState };
    case SET_IDEA:
      return action.idea;
    default:
      return state;
  }
};

export default selectedIdeaReducer;