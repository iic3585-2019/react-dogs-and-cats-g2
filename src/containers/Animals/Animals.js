import React, { Component } from 'react';
import './Animals.css';
import { getAnimal } from '../../wrapper/animals';

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesLoaded: null,
    };
    this.animal(5);
  }

  async animal(quantity) {
    console.log('me llamaron');
    const newState = [];
    while (quantity > 0) {
      const randomAnimal = await getAnimal();
      newState.push(randomAnimal.image);
      quantity -= 1;
    }
    this.setState({
      imagesLoaded: newState,
    });
  }

  changeState() {
    const { imagesLoaded } = this.state;
    imagesLoaded.shift();
    const newState = imagesLoaded;
    if (newState.length === 0) {
      this.animal(2);
    } else {
      this.setState({
        imagesLoaded: newState,
      });
    }
  }

  render() {
    const { imagesLoaded } = this.state;
    if (imagesLoaded !== null) {
      return (
        <div className="Home">
          <div className="lander">
            <h1>Dogs And Cats</h1>
            <img src={imagesLoaded[0]} onClick={() => this.changeState()} />
          </div>
        </div>
      );
    }
    return (
      <div className="Home">
        <div className="lander">
          <h1>Dogs And Cats</h1>
          <img />
        </div>
      </div>
    );
  }
}

export default Animal;
