import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedMinion } from '../store/selectedMinion';
import { setMinionEditing, resetEditingState } from '../store/appState';
import { setWork } from '../store/work';
import Minion from './Minion';
import axios from 'axios';

const MinionWithParams = (props) => {
  const { minionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEditingState());

    if (minionId === 'new') {
      dispatch(setMinionEditing());
      dispatch(setSelectedMinion({
        name: '',
        title: '',
        weaknesses: '',
        salary: 0,
      }));
      dispatch(setWork([]));
    } else {
      axios.get(`http://localhost:4001/api/minions/${minionId}`)
        .then(res => dispatch(setSelectedMinion(res.data)))
        .catch(console.error);

      axios.get(`http://localhost:4001/api/minions/${minionId}/work`)
        .then(res => dispatch(setWork(res.data)))
        .catch(console.error);
    }
  }, [minionId, dispatch]);

  return <Minion {...props} />;
};

export default MinionWithParams;