import React from 'react';
import $ from 'classnames';
import './style.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

const Color = ({ color, className, ...props }) => (<div className={$(color, className)} {...props} />);

export default () => (
  <TinderSwipeable
    top={<Color color="red" />}
    bottom={<Color color="blue" />}
    threshold={.5}
    onRightSwipe={
      () => {
        console.log('right!');
      }
    }
    onLeftSwipe={
      () => {
        console.log('left!');
      }
    }
  />
);
