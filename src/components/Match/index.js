import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import './style.css';

// Components
import { Modal } from '@material-ui/core';
import Image from '../Image';

const Match = ({ isAMatch, uri, onClose, ...props }) => (
  <div className="match" {...props}>
    <Modal open={isAMatch} onClose={onClose}>
      <div className="match__body elevation-2">
        <Image uri={uri} />

        <h1>It's a Match!</h1>
      </div>
    </Modal>
  </div>
);

Match.defaultProps = {
  onClose: () => { }
};

Match.propTypes = {
  isAMatch: PropTypes.bool.isRequired,
  uri: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default Match;
