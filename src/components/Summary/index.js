import React from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';

// Stylesheets
import './style.css';

const Summary = ({ className, ...props }) => {
  const { summary } = props;
  const { name, age, description } = summary;

  return (
    <div
      className={$('summary', className)}
      {...props}
    >
      <div className="d-flex-r d-flex-a-c v-padding-0 h-padding-1">
        <div className="summary__name">
          {name}
        </div>

        <div className="summary__age margin-l-0">
          {age}
        </div>
      </div>

      <div className="h-separator" />

      <div className="summary__description v-padding-0 h-padding-1">
        {description}
      </div>
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
