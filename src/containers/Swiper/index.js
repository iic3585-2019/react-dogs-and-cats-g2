import React, { Component } from 'react';
import './style.css'

// Anime (https://github.com/juliangarnier/anime/)
import anime from 'animejs';

// React Swipeable (https://github.com/dogfessional/react-swipeable)
import { Swipeable } from 'react-swipeable'

// Verge (https://github.com/ryanve/verge)
import verge from 'verge';

const getCurrentMaxDeltaX = () => Math.floor(verge.viewportW() / 2);

export default class extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deltaX: 0,
      isSwiping: false,
      maxDeltaX: getCurrentMaxDeltaX(),
    }

    this.animation = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onViewportResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onViewportResize)
  }

  onViewportResize = () => {
    this.setState({ maxDeltaX:  getCurrentMaxDeltaX()})
  }

  onSwiping = (event) => {
    if (!this.state.isSwiping) {
      if (this.animation)
        this.animation.pause()
      this.setState({ isSwiping: true, deltaX: event.deltaX })
    } else {
      this.setState({ deltaX: event.deltaX })
    }
  }

  onSwiped = () => {
    this.setState({ isSwiping: false})

    const duration = 5000

    if (this.isRightSwipe()) {
      this.animation = anime({
        targets: '.swiped',
        opacity: 0,
        duration: duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      })
    } else if (this.isLeftSwipe()) {
      this.animation = anime({
        targets: '.swiped',
        opacity: 0,
        duration: duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
      })
    } else {
      this.animation = anime({
        targets: '.swiped',
        rotate: 0,
        duration: duration,
        easing: 'cubicBezier(0.23, 1, 0.32, 1)',
        update: (anim) => {
          // const rawDeg = anim.animations[0].currentValue;
          // const deg = Number(rawDeg.slice(0, -3));
          // const deltaX = this.degToDeltaX(deg);

          // this.setState({ deltaX })
        }
      })
    }

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

    return -1 * deltaX * 22.5 / maxDeltaX
  }

  degToDeltaX = (deg) => {
  }

  render() {
    const { deltaX } = this.state;
    const deg = this.deltaXToDeg(deltaX)

    return (
      <Swipeable onSwiping={this.onSwiping} onSwiped={this.onSwiped}>
        <div className="swiper">
          <div className="swiped" style={{
            transform: `rotate(${deg}deg)`
          }}>
          </div>
        </div>
      </Swipeable>
    )
  }
}
