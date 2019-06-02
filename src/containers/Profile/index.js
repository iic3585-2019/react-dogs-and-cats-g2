import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Stylesheets
import './style.css';

// Material UI
import { TextField } from '@material-ui/core';

import { updateProfile } from '../../store/actions/profile';

const Profile = (props) => {
  const { profile, update } = props;
  const { mealsPerDay, weeklyWalks, hoursAlone } = profile;

  return (
    <div className="profile">
      <TextField
        id="meals-per-day"
        type="number"
        value={mealsPerDay}
        label="Meals per day"
        helperText="Dogs and cats loves to eat"
        margin="normal"
        onChange={({ target: { value } }) => update({ mealsPerDay: Number(value) })}
      />

      <TextField
        id="weekly-walks"
        type="number"
        value={weeklyWalks}
        label="Weekly walks"
        helperText="Dogs loves to walk"
        margin="normal"
        onChange={({ target: { value } }) => update({ weeklyWalks: Number(value) })}
      />

      <TextField
        id="hours-alone"
        type="number"
        value={hoursAlone}
        label="Hours alone"
        helperText="Dogs want to be with you, but cats..."
        margin="normal"
        onChange={({ target: { value } }) => update({ hoursAlone: Number(value) })}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  update: (payload) => dispatch(updateProfile(payload)),
});

Profile.propTypes = {
  profile: PropTypes.shape({
    mealsPerDay: PropTypes.number.isRequired,
    weeklyWalks: PropTypes.number.isRequired,
    hoursAlone: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
