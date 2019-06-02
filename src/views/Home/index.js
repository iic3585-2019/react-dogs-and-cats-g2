import React from 'react';
import $ from 'classnames';
import './style.css';

import TinderSwipeable from '../../containers/TinderSwipeable';

const Red = ({ className, ...props }) => (<div className={$('red', className)} {...props} />);
const Blue = ({ className, ...props }) => (<div className={$('blue', className)} {...props} />);

export default () => (
  <TinderSwipeable
    Top={Red}
    Bottom={Blue}
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
