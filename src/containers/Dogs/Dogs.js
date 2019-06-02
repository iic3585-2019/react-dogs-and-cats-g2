import React, { Component } from 'react';
import './Dogs.css';
import { getRandomDogsImages } from '../../wrapper/dogs';
import { getRandomCatsImages } from '../../wrapper/cats';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesLoaded: null,
    };
    this.getDog(5);
  }

  getDog(quantity) {
    getRandomDogsImages(quantity).then(dogs => {
      const { imagesLoaded } = this.state;
      if (imagesLoaded === null) {
        this.setState({
          imagesLoaded: dogs.data.message,
        });
      } else {
        const newState = imagesLoaded.concat(dogs.data.message);
        this.setState({
          imagesLoaded: newState,
        });
      }
    });
  }

  getCat(quantity) {
    getRandomCatsImages(quantity).then(cats => {
      const { imagesLoaded } = this.state;
      const imagesCats = [];
      cats.data.map(cat => imagesCats.push(cat.url));
      const newState = imagesLoaded.concat(imagesCats);
      this.setState({
        imagesLoaded: newState,
      });
    });
    this.getDog(5);
  }

  changeState() {
    const { imagesLoaded } = this.state;
    imagesLoaded.shift();
    const newState = imagesLoaded;
    this.setState({
      imagesLoaded: newState,
    });
  }

  render() {
    const { imagesLoaded } = this.state;
    if (imagesLoaded !== null) {
      this.getCat(5);
      return (
        <div className="Home">
          <div className="lander">
            <h1>Dogs And Cats</h1>
            <img src={imagesLoaded[0]} onClick={() => this.changeState()} />
          </div>
        </div>
      );
    }
    return false;
  }
}

export default Home;
