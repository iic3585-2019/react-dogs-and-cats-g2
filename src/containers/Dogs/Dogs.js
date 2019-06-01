import React, { Component } from 'react';
import './Dogs.css';
import { getRandomDogsImages } from '../../wrapper/dogs';
import { getRandomCatsImages } from '../../wrapper/cats';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogsImagesLoaded: null,
      catsImagesCatLoaded: null,
    };
    this.getDog(5);
    this.getCat(5);
  }

  getDog(quantity) {
    getRandomDogsImages(quantity).then(dogs => {
      this.setState({
        dogsImagesLoaded: dogs.data.message,
      });
    });
  }

  getCat(quantity) {
    getRandomCatsImages(quantity).then(cats => {
      this.setState({
        catsImagesCatLoaded: cats.data,
      });
    });
  }

  render() {
    const { dogsImagesLoaded, catsImagesCatLoaded } = this.state;
    console.log(catsImagesCatLoaded);
    if (dogsImagesLoaded !== null && catsImagesCatLoaded !== null) {
      return (
        <div className="Home">
          <div className="lander">
            <h1>Dogs And Cats</h1>
            {dogsImagesLoaded.map(dog => (
              <img src={dog} />
            ))}
            {catsImagesCatLoaded.map(cat => (
              <img src={cat.url} />
            ))}
          </div>
        </div>
      );
    }
    return false;
  }
}

export default Home;
