// Action Types
const SET_NEW_IDEA_ON = 'SET_NEW_IDEA_ON';
const SET_NEW_MINION_ON = 'SET_NEW_MINION_ON';
const SET_NEW_WORK_ON = 'SET_NEW_WORK_ON';
const RESET_EDITING_STATE = 'RESET_STATE';

// Action Creators
export const setIdeaEditing = () => ({ type: SET_NEW_IDEA_ON });
export const setMinionEditing = () => ({ type: SET_NEW_MINION_ON });
export const setWorkEditing = () => ({ type: SET_NEW_WORK_ON });
export const resetEditingState = () => ({ type: RESET_EDITING_STATE });

// Initial State
const initialState = {
  editingNewIdea: false,
  editingNewMinion: false,
  editingNewWork: false,
};

// Reducer
const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_IDEA_ON:
      return { ...initialState, editingNewIdea: true };
    case SET_NEW_MINION_ON:
      return { ...initialState, editingNewMinion: true };
    case SET_NEW_WORK_ON:
      return { ...initialState, editingNewWork: true };
    case RESET_EDITING_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default appStateReducer;