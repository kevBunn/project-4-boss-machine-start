import axios from 'axios';

// Action Types
const CREATE_MEETING = 'CREATE_MEETING';
const CANCEL_MEETINGS = 'CANCEL_MEETINGS';
const SET_MEETINGS = 'SET_MEETINGS';

// Action Creators
export const setMeetings = meetings => ({ type: SET_MEETINGS, meetings });
export const createMeeting = meeting => ({ type: CREATE_MEETING, meeting });
export const cancelMeetings = () => ({ type: CANCEL_MEETINGS });

// Thunks
export const createMeetingThunk = () => dispatch => {
  axios.post('http://localhost:4001/api/meetings')
    .then(res => res.data)
    .then(createdMeeting => {
      dispatch(createMeeting(createdMeeting));
    })
    .catch(console.error);
};

export const cancelMeetingsThunk = () => dispatch => {
  axios.delete('http://localhost:4001/api/meetings')
    .then(() => {
      dispatch(cancelMeetings());
    })
    .catch(console.error);
};

// Reducer
const initialState = [];

const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETING:
      return [...state, action.meeting].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    case CANCEL_MEETINGS:
      return [];
    case SET_MEETINGS:
      return action.meetings;
    default:
      return state;
  }
};

export default meetingsReducer;