import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelMeetingsThunk } from '../store/meetings';
import AllMeetings from './AllMeetings';
import appEnter from '../appEnter';

const Home = ({ cancelMeetings }) => {
  useEffect(() => {
    appEnter(); // manually trigger data loading
  }, []);

  return (
    <div id="landing-page">
      <div id="launch-buttons">
        <Link to="/minions">
          <div id="minions-launch" className="button launch-button">
            <img className="button launch-icon" src="/img/minion_icon_home.svg" alt="Minions icon home" />
            <div className="button label launch-label">
              MINIONS.exe
            </div>
          </div>
        </Link>
        <Link to="/ideas">
          <div id="ideas-launch" className="button launch-button">
            <img className="button launch-icon" src="/img/minion_icon_money.svg" alt="Minions icon money" />
            <div className="button label launch-label">
              MILLION $ IDEAS.exe
            </div>
          </div>
        </Link>
      </div>
      <AllMeetings />
      <div id="meetings-cancel" className="button" onClick={cancelMeetings}>
        Cancel All
      </div>
    </div>
  )
};

const mapDispatch = dispatch => ({
  cancelMeetings: () => {
    dispatch(cancelMeetingsThunk());
  }
})

export default connect(null, mapDispatch)(Home);
