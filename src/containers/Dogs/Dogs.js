import React, { Component } from 'react';
import './Dogs.css';
import { getRandomDogsImages } from '../../wrapper/dogs';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: null,
    };
    this.getDog(1);
  }

  getDog(quantity) {
    getRandomDogsImages(quantity).then(dogs => {
      this.setState({
        imageLoaded: dogs.data.message[0],
      });
    });
  }

  render() {
    const { imageLoaded } = this.state;
    if (imageLoaded !== null) {
      return (
        <div className="Home">
          <div className="lander">
            <h1>Dogs And Cats</h1>
            <img src={imageLoaded} />
          </div>
        </div>
      );
    }
    return false;
  }
}

export default Home;
