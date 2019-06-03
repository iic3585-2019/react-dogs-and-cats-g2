import React from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';

// Stylesheets
import './style.css';

// External modules:
// - Lodash (https://github.com/lodash/lodash)
import _ from 'lodash';

const Summary = ({ className, ...props }) => {
  const { summary } = props;
  const { name, age, description, breed } = summary;

  return (
    <div className={$('summary', className)} {...props}>
      <div className="d-flex-r d-flex-a-c v-padding-0 h-padding-1">
        <div className="summary__name">{name}</div>
        ,
        <div className="summary__age margin-l-0">{age}</div>

        <div className="summary__breed margin-l-0">
          (
          {_.capitalize(breed)}
          )
        </div>
      </div>

      <div className="h-separator" />

      <div className="summary__description v-padding-0 h-padding-1">{description}</div>
    </div>
  );
};

Summary.defaultProps = {
  className: '',
};

Summary.propTypes = {
  summary: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default Summary;
