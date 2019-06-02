import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';
import './style.css';

// External modules:
// - Change (https://github.com/chancejs/chancejs)
import Chance from 'chance';

// Components
import TinderSwipeable from '../../containers/TinderSwipeable';
import Menu from '../../containers/Menu';

const chance = new Chance();
const getItem = () => {
  return {
    uri: "https://static.twentytwowords.com/wp-content/uploads/03_-_ty6nplc.jpg",
    summary: {
      name: chance.first(),
      age: chance.age({ type: 'child' }),
      description: chance.paragraph({ sentences: 5 })
    },
  };
};

// =============================================================================

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

// =============================================================================

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

// =============================================================================

export default class Home extends Component {
  constructor(props) {
    super(props);

    const items = [
      getItem(),
      getItem(),
      getItem(),
      getItem(),
      getItem(),
      getItem(),
      getItem(),
    ];

    this.state = {
      items
    };
  }

  onRightSwipe = () => {
    const { items } = this.state;

    this.setState({ items: items.slice(1) });
  }

  onLeftSwipe = () => {
    const { items } = this.state;

    this.setState({ items: items.slice(1) });
  }

  render() {
    const { items } = this.state;

    const batch = items.slice(0, 2);
    const tinderSwipeables = batch.map(({ uri, summary }) => (
      <div
        key={summary.name}
        className="tinder-swipeable-wrapper"
      >
        <TinderSwipeable
          node={<Image uri={uri} />}
          threshold={.5}
          onRightSwipe={this.onRightSwipe}
          onLeftSwipe={this.onLeftSwipe}
        />

        <Summary summary={summary} />
      </div>
    ));

    return (
      <React.Fragment>
        <Menu />

        <div className="home">
          {tinderSwipeables}
        </div>
      </React.Fragment>
    );
  }
}
