import React from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';

// Stylesheets
import './style.css';

const Image = ({ uri, className, ...props }) => (
  <div
    className={$('image', className)}
    style={{ backgroundImage: `url(${uri})` }}
    {...props}
  />
);

Image.defaultProps = {
  className: '',
};

Image.propTypes = {
  uri: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Image;
