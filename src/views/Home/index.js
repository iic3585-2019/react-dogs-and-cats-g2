import React, { Component } from 'react';
import $ from 'classnames';
import './style.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

const Image = ({ uri, className, ...props }) => (
  <div
    className={$('image', className)}
    style={{ backgroundImage: `url(${uri})` }}
    {...props}
  />
);

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
    );
  }
}
