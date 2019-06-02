import React, { Component } from 'react';
import $ from 'classnames';
import './style.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

const Color = ({ color, className, ...props }) => (<div className={$(color, className)} {...props} />);

export default class Home extends Component {
  constructor(props) {
    super(props);

    const items = [
      <Color color="red" />,
      <Color color="blue" />,
      <Color color="green" />,
    ];

    this.state = { items };
  }

  onRightSwipe = () => {
    const { items } = this.state;

    const newItems = items.slice(1);
    this.setState({items: newItems});

    console.log('right!');
  }

  onLeftSwipe = () => {
    const { items } = this.state;

    const newItems = items.slice(1);
    this.setState({items: newItems});

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
