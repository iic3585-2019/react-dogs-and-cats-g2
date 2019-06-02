import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// External modules:
// - Anime (https://github.com/juliangarnier/anime/)
import anime from 'animejs';

// - React Swipeable (https://github.com/dogfessional/react-swipeable)
import { Swipeable } from 'react-swipeable';

// - Verge (https://github.com/ryanve/verge)
import verge from 'verge';

const getCurrentMaxDeltaX = () => Math.floor(verge.viewportW() / 2);

class TinderSwipeable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deltaX: 0,
      maxDeltaX: getCurrentMaxDeltaX(),

      isSwiping: false,
    };

    this.animation = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onViewportResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onViewportResize);
  }

  onViewportResize = () => {
    this.setState({ maxDeltaX: getCurrentMaxDeltaX() });
  }

  onSwiping = ({ deltaX }) => {
    const { isSwiping } = this.state;

    if (!isSwiping) {
      if (this.animation) this.animation.pause();

      this.setState({ deltaX, isSwiping: true });
    } else {
      this.setState({ deltaX });
    }
  }

  onSwiped = () => {
    const { onRightSwipe, onLeftSwipe } = this.props;

    const targets = '.tinder-swipeable .top';
    const duration = 500;

    if (this.isRightSwipe()) {
      this.animation = anime({
        targets,
        opacity: 0,
        duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        complete: () => {
          this.setState({ deltaX: 0 });

          onRightSwipe();
        },
      });
    } else if (this.isLeftSwipe()) {
      this.animation = anime({
        targets,
        opacity: 0,
        duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        complete: () => {
          this.setState({ deltaX: 0 });

          onLeftSwipe();
        },
      });
    } else {
      this.animation = anime({
        targets,
        rotate: 0,
        duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        update: () => {
          // const rawDeg = anim.animations[0].currentValue;
          // const deg = Number(rawDeg.slice(0, -3));
          // const deltaX = this.degToDeltaX(deg);

          // this.setState({ deltaX })
        },
        complete: () => {
          this.setState({ deltaX: 0 });
        },
      });
    }

    this.setState({ isSwiping: false });
  }

  isRightSwipe = () => {
    const { threshold } = this.props;
    const { deltaX, maxDeltaX } = this.state;

    return deltaX < -1 * maxDeltaX * threshold;
  }

  isLeftSwipe = () => {
    const { threshold } = this.props;
    const { deltaX, maxDeltaX } = this.state;

    return deltaX > maxDeltaX * threshold;
  }

  deltaXToDeg = (deltaX) => {
    const { maxDeltaX } = this.state;

    return -1 * deltaX * 22.5 / maxDeltaX;
  }

  degToDeltaX = () => { }

  render() {
    const { top, bottom } = this.props;
    const { deltaX } = this.state;

    const deg = this.deltaXToDeg(deltaX);

    return (
      <Swipeable onSwiping={this.onSwiping} onSwiped={this.onSwiped}>
        <div className="tinder-swipeable">
          {bottom && (
            <div className="bottom">
              {bottom}
            </div>
          )}

          <div
            className="top"
            style={{
              transform: `rotate(${deg}deg)`
            }}
          >
            {top}
          </div>
        </div>
      </Swipeable>
    );
  }
}

TinderSwipeable.defaultProps = {
  bottom: null,
  threshold: .5,

  onRightSwipe: () => { },
  onLeftSwipe: () => { },
};

TinderSwipeable.propTypes = {
  top: PropTypes.node.isRequired,
  bottom: PropTypes.node,
  threshold: PropTypes.number,

  onRightSwipe: PropTypes.func,
  onLeftSwipe: PropTypes.func,
};

export default TinderSwipeable;
