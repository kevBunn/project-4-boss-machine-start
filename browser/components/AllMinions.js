import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteMinionThunk } from '../store/minions';
import minionsEnter from '../minionsEnter';

const AllMinions = ({ minions, deleteMinion, createMinion }) => {
  const navigate = useNavigate();

  useEffect(() => {
    minionsEnter();
  }, []);

  const handleCreateMinion = (minionData) => {
    createMinion(minionData, navigate);
  };

  const renderedMinions = minions.map(minion => {
    let name = minion.name.match(/.{1,11}/g).join('\n');
    return (
      <div className="minion-grid" key={minion.id}>
        <Link to={`/minions/${minion.id}`}>
          <img className="button minion-thumbnail" src="/img/minion.svg" alt="minion" />
          <p>{name}</p>
          <p>ID #{minion.id}</p>
        </Link>
        <img onClick={() => deleteMinion(minion.id)} className="button x-button" src="/img/x_button.svg" alt="delete" />
      </div>
    );
  });

  return (
    <div>
      <div id="minions-landing">
        <div id="minions-title" className="label minions-label">MINIONS.exe</div>
        <div id="all-minions">
          {renderedMinions}
          <div id="add-minion-button-grid" className="minion-grid">
            <Link to="/minions/new">
              <img id="add-minion-button" className="button" src="/img/add_button.svg" alt="add minion" />
            </Link>
          </div>
        </div>
      </div>
      <div className="button back-button">
        <Link to="/">
          <img className="button" src="/img/arrow.svg" alt="back" />
        </Link>
      </div>
    </div>
  );
};

const mapState = ({ minions }) => ({ minions });

const mapDispatch = dispatch => ({
  deleteMinion: minionId => {
    dispatch(deleteMinionThunk(minionId));
  }
});

export default connect(mapState, mapDispatch)(AllMinions);