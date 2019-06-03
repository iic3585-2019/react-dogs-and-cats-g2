import React, { Component } from 'react';

// Stylesheets
import './style.css';

// External modules:
// - Change (https://github.com/chancejs/chancejs)
import Chance from 'chance';

// - Lodash (https://github.com/lodash/lodash)
import _ from 'lodash';

// Internal modules:
// - API
import getPet from '../../API/pets';

// Components
import Image from '../../components/Image';
import Menu from '../../containers/Menu';
import Summary from '../../components/Summary';
import TinderSwipeable from '../../containers/TinderSwipeable';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { feed: [] };
  }

  async componentDidMount() {
    const feed = await this.buildFeed(10);

    this.setState({ feed });
  }

  buildFeed = async (size) => {
    const chance = new Chance();

    const buildFeedItem = async () => {
      const pet = await getPet();

      return {
        uri: pet.image,
        summary: {
          name: chance.first(),
          age: chance.age({ type: 'child' }),
          description: chance.paragraph({ sentences: 5 })
        },
      };
    };

    return Promise.all(
      [...Array(size).keys()].map(buildFeedItem)
    );
  }

  onRightSwipe = () => {
    const { feed } = this.state;

    this.setState({ feed: feed.slice(1) });
  }

  onLeftSwipe = () => {
    const { feed } = this.state;

    this.setState({ feed: feed.slice(1) });
  }

  render() {
    const { feed } = this.state;

    const feedBatch = _.reverse(feed.slice(0, 2));

    return (
      <div className="home">
        <Menu />

        {
          feedBatch.map(({ uri, summary }) => (
            <div
              key={summary.name}
              className="tinder-swipeable-wrapper"
            >
              <TinderSwipeable
                node={<Image uri={uri} />}
                threshold={.5}
                onRightSwipe={this.onRightSwipe}
                onLeftSwipe={this.onLeftSwipe}
              />

              <Summary summary={summary} />
            </div>
          ))
        }
      </div>
    );
  }
}
