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
import Match from '../../components/Match';
import Menu from '../../containers/Menu';
import Summary from '../../components/Summary';
import TinderSwipeable from '../../containers/TinderSwipeable';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      isAMatch: false,
    };
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
        like: Boolean(_.random(1)),
      };
    };

    return Promise.all(
      [...Array(size).keys()].map(buildFeedItem)
    );
  }

  onRightSwipe = (feedItem) => {
    const { feed } = this.state;

    this.setState({
      feed: feed.slice(1),
      isAMatch: feedItem.like
    });
  }

  onLeftSwipe = () => {
    const { feed } = this.state;

    this.setState({ feed: feed.slice(1) });
  }

  render() {
    const { feed, isAMatch } = this.state;

    const feedBatch = _.reverse(feed.slice(0, 2));

    return (
      <div className="home">
        <Menu />

        {
          feedBatch.length > 0 && (
            <Match
              isAMatch={isAMatch}
              uri={feed[0].uri}
              onClose={() => this.setState({ isAMatch: false })}
            />
          )
        }

        {
          feedBatch.map((feedItem) => (
            <div
              key={feedItem.summary.name + feedItem.uri}
              className="tinder-swipeable-wrapper"
            >
              <TinderSwipeable
                node={<Image uri={feedItem.uri} />}
                threshold={.5}
                onRightSwipe={() => this.onRightSwipe(feedItem)}
                onLeftSwipe={this.onLeftSwipe}
              />

              <Summary summary={feedItem.summary} />
            </div>
          ))
        }
      </div>
    );
  }
}
