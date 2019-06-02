import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'classnames';
import './style.css';
import './classes.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

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
      <Image uri="https://files.brightside.me/files/news/part_22/223005/preview-6210455-650x341-98-1508149182.jpg" />,
      <Image uri="https://steemitimages.com/640x0/http://1.bp.blogspot.com/-3aMMGqmMOgY/VXekCz-bBiI/AAAAAAAAAE0/UsptvE9Blko/s1600/The%2BMost%2BBeautiful%2BWoman%2Bin%2Bthe%2BWorld%2BAward2.jpg" />,
      <Image uri="https://static.twentytwowords.com/wp-content/uploads/03_-_ty6nplc.jpg" />,
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

    return (
      <div>
        <TinderSwipeable
          top={items[0]}
          bottom={items[1]}
          threshold={.5}
          onRightSwipe={
            this.onRightSwipe
          }
          onLeftSwipe={
            this.onLeftSwipe
          }
        />

        <Summary summary={{
          name: 'Lorenzo',
          age: 8,
          description: 'Proin aliquet libero eros, vel auctor ante ultricies sit amet. Integer ex justo, euismod et felis non, pretium hendrerit sapien. Ut interdum efficitur massa, a tincidunt enim malesuada id.'
        }}
        />

      </div>
    );
  }
}
