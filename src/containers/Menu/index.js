import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Stylesheets
import './style.css';

// Material UI
import { IconButton, Icon, Drawer, TextField } from '@material-ui/core';
import  Profile  from '../Profile';

import { openMenu, closeMenu } from '../../store/actions/menu';

const Menu = (props) => {
  const { isOpen, open, close } = props;

  return (
    <div className="menu">
      <IconButton className="menu__button" onClick={open}>
        <Icon>menu</Icon>
      </IconButton>

      <Drawer open={isOpen} onClose={close}>
        <Profile />
      </Drawer>
    </div>
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
