import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Stylesheets
import './style.css';

// Material UI
import { IconButton, Icon, Drawer, TextField } from '@material-ui/core';

import { openMenu, closeMenu } from '../../store/actions/menu';

const Menu = (props) => {
  const { isOpen, open, close } = props;

  return (
    <React.Fragment>
      <IconButton color="secondary" aria-label="Add an alarm" onClick={open}>
        <Icon>menu</Icon>
      </IconButton>

      <Drawer open={isOpen} onClose={close}>
        <TextField
          id="meals-per-day"
          type="number"
          defaultValue="2"
          label="Meals per day"
          helperText="Dogs and cats loves to eat"
          margin="normal"
        />

        <TextField
          id="weekly-walks"
          type="number"
          defaultValue="5"
          label="Weekly walks"
          helperText="Dogs loves to walk"
          margin="normal"
        />

        <TextField
          id="hours-alone"
          type="number"
          defaultValue="8"
          label="Hours alone"
          helperText="Dogs want to be with you, but cats..."
          margin="normal"
        />
      </Drawer>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isOpen: state.menu.isOpen,
});

const mapDispatchToProps = dispatch => ({
  open: () => dispatch(openMenu()),
  close: () => dispatch(closeMenu())
});

Menu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
