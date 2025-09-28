import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedIdea } from '../store/selectedIdea';
import { resetEditingState, setIdeaEditing } from '../store/appState';
import Idea from './Idea';
import axios from 'axios';

const IdeaWithParams = (props) => {
  const { ideaId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEditingState());

    if (ideaId === 'new') {
      dispatch(setIdeaEditing());
      dispatch(setSelectedIdea({
        name: 'New Idea',
        description: '',
        weeklyRevenue: 0,
        numWeeks: 0,
      }));
    } else {
      axios.get(`http://localhost:4001/api/ideas/${ideaId}`)
        .then(res => {
          dispatch(setSelectedIdea(res.data));
        })
        .catch(console.error);
    }
  }, [ideaId, dispatch]);

  return <Idea {...props} />;
};

export default IdeaWithParams;