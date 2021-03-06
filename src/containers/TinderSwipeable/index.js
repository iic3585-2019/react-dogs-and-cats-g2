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
    this.ref = React.createRef();
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

    const targets = this.ref.current;
    const duration = 500;

    if (this.isRightSwipe()) {
      this.animation = anime({
        targets,
        opacity: 0,
        duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        complete: () => {
          this.setState({ deltaX: 0 });
          targets.style.opacity = 1;

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
          targets.style.opacity = 1;

          onLeftSwipe();
        },
      });
    } else {
      this.animation = anime({
        targets,
        rotate: 0,
        duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        complete: () => {
          this.setState({ deltaX: 0 });
        },
      });
    }

    this.setState({ isSwiping: false });
  }

  deltaXToDeg = (deltaX) => {
    const { maxDeltaX } = this.state;

    return -1 * deltaX * 22.5 / maxDeltaX;
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

  render() {
    const { node } = this.props;
    const { deltaX } = this.state;

    const deg = this.deltaXToDeg(deltaX);
    const style = { transform: `rotate(${deg}deg)` };

    return (
      <Swipeable onSwiping={this.onSwiping} onSwiped={this.onSwiped}>
        <div className="tinder-swipeable">
          <div style={style} className="tinder-swipeable__node" ref={this.ref}>
            {node}
          </div>
        </div>
      </Swipeable>
    );
  }
}

TinderSwipeable.defaultProps = {
  threshold: .5,

  onRightSwipe: () => { },
  onLeftSwipe: () => { },
};

TinderSwipeable.propTypes = {
  node: PropTypes.node.isRequired,
  threshold: PropTypes.number,

  onRightSwipe: PropTypes.func,
  onLeftSwipe: PropTypes.func,
};

export default TinderSwipeable;
