import React from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import './style.css';

// Components
import { Button, Modal } from '@material-ui/core';
import Image from '../Image';

const Match = ({ isAMatch, uri, onClose, ...props }) => (
  <div className="match" {...props}>
    <Modal open={isAMatch} onClose={onClose}>
      <div className="match__body elevation-2">
        <Image uri={uri} />

        <Button variant="contained" color="primary" onClick={onClose}>Aceptar</Button>
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
