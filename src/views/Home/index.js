import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';
import './style.css';

// External modules:
// - Change (https://github.com/chancejs/chancejs)
import Chance from 'chance';

import TinderSwipeable from '../../containers/TinderSwipeable';
import Animals from '../../containers/Animals/Animals.js';
import { getAnimal } from '../../wrapper/animals';

//const chance = new Chance();

const getItem = async () => {
  const randomAnimal = await getAnimal();
  return {
    uri: randomAnimal.image,
    summary: {
      breed: randomAnimal.breed,
    },
  };
};

// =============================================================================

const Image = ({ uri, className, ...props }) => (
  <div className={$('image', className)} style={{ backgroundImage: `url(${uri})` }} {...props} />
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
  const { breed } = summary;

  return (
    <div className={$('summary', className)} {...props}>
      <div className="d-flex-r d-flex-a-c v-padding-0 h-padding-1">
        <div className="summary__name">{breed}</div>
      </div>

      <div className="h-separator" />
    </div>
  );
};

Summary.defaultProps = {
  className: '',
};

Summary.propTypes = {
  summary: PropTypes.shape({
    breed: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

// =============================================================================

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
    const items = [];
    getItem().then(async item => {
      console.log(items);
      items.push(item);
      for (let i = 0; i < 5; i++) {
        const newItem = await getItem();
        items.push(newItem);
      }
      this.setState({
        items: items,
      });
    });
  }

  onRightSwipe = () => {
    console.log('entre a la derecha');
    const { items } = this.state;
    console.log(items);

    const newItems = items.slice(1);
    console.log('estos son los nuevos items');
    console.log(newItems);
    this.setState({ items: newItems });

    console.log('right!');
  };

  onLeftSwipe = () => {
    const { items } = this.state;

    const newItems = items.slice(1);
    console.log(newItems);
    this.setState({ items: newItems });

    console.log('left!');
  };

  render() {
    const { items } = this.state;
    if (items !== null) {
      const batch = items.slice(0, 2);
      console.log(batch);
      const tinderSwipeables = batch.map(({ uri, summary }) => (
        <div key={summary.breed} className="tinder-swipeable-wrapper">
          <TinderSwipeable
            node={<Image uri={uri} />}
            threshold={0.5}
            onRightSwipe={this.onRightSwipe}
            onLeftSwipe={this.onLeftSwipe}
          />

          <Summary summary={summary} />
        </div>
      ));

      return <div className="home">{tinderSwipeables}</div>;
    }
    return false;
  }
}
