import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';
import './style.css';
import './classes.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

const getItem = () => {
  return {
    uri: "https://static.twentytwowords.com/wp-content/uploads/03_-_ty6nplc.jpg",
    summary: {
      name: 'Lorenzo',
      age: 8,
      description: 'Proin aliquet libero eros, vel auctor ante ultricies sit amet. Integer ex justo, euismod et felis non, pretium hendrerit sapien. Ut interdum efficitur massa, a tincidunt enim malesuada id.'
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
    ];

    this.state = { items };
  }

  onRightSwipe = () => {
    const { items } = this.state;

    const newItems = items.slice(1);
    this.setState({ items: newItems });

    console.log('right!');
  }

  onLeftSwipe = () => {
    const { items } = this.state;

    const newItems = items.slice(1);
    this.setState({ items: newItems });

    console.log('left!');
  }

  render() {
    const { items } = this.state;

    if (items.length > 0) {
      const { uri, summary } = items[0];
      const topImage = <Image uri={uri} />;

      if (items.length > 1) {
        const bottomImage = <Image uri={items[1].uri} />;

        return (
          <div>
            <TinderSwipeable
              top={topImage}
              bottom={bottomImage}
              threshold={.5}
              onRightSwipe={this.onRightSwipe}
              onLeftSwipe={this.onLeftSwipe}
            />

            <Summary summary={summary} />
          </div>
        );
      }

      return (
        <div>
          <TinderSwipeable
            top={topImage}
            threshold={.5}
            onRightSwipe={this.onRightSwipe}
            onLeftSwipe={this.onLeftSwipe}
          />

          <Summary summary={summary} />
        </div>
      );
    }

    return <div />;
  }
}
