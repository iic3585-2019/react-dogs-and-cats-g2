import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Stylesheets
import './style.css';

// External modules:
// - Change (https://github.com/chancejs/chancejs)
import Chance from 'chance';

// - Lodash (https://github.com/lodash/lodash)
import _ from 'lodash';

// Internal modules:
// - API
import { connect } from 'react-redux';
import getPet from '../../API/pets';

// Components
import Image from '../../components/Image';
import Match from '../../components/Match';
import Menu from '../../containers/Menu';
import Summary from '../../components/Summary';
import TinderSwipeable from '../../containers/TinderSwipeable';

const chance = new Chance();

const toProbability = (x) => {
  const m = .025;
  const y = m * x + 0.5;

  if (y < 0) return 0;
  if (y > 1) return 1;

  return y;
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: [],
      match: null,
    };
  }

  async componentDidMount() {
    const feed = await this.buildFeed(10);

    this.setState({ feed });
  }

  buildFeedItem = async () => {
    const pet = await getPet();

    return {
      uri: pet.image,
      type: pet.type,
      summary: {
        name: chance.first(),
        age: chance.age({ type: 'child' }),
        breed: pet.breed,
        description: chance.paragraph({ sentences: 5 }),
      },
    };
  };

  buildFeed = async size => {
    return Promise.all([...Array(size).keys()].map(this.buildFeedItem));
  };

  moreFeed = async () => {
    const { feed } = this.state;

    const newFeedItem = await this.buildFeedItem();

    this.setState({ feed: [...feed, newFeedItem] });
  }

  onRightSwipe = async feedItem => {
    const { profile: { mealsPerDay, weeklyWalks, hoursAlone } } = this.props;
    const { feed } = this.state;

    let x;
    switch (feedItem.type) {
      case 'dog':
        x = (mealsPerDay - 3) + (weeklyWalks - 5) - (hoursAlone - 8);
        break;
      case 'cat':
        x = (mealsPerDay - 6) - (weeklyWalks - 2) + (hoursAlone - 10);
        break;
      default:
        x = 0;
    }
    const heLikesYou = Math.random() <= toProbability(x);

    // eslint-disable-next-line no-console
    console.log(`x: ${x}`, `p: ${toProbability(x)}`, heLikesYou);

    this.setState({
      feed: feed.slice(1),
      match: heLikesYou ? feedItem : null,
    });

    this.moreFeed();
  };

  onLeftSwipe = async () => {
    const { feed } = this.state;

    this.setState({ feed: feed.slice(1) });

    this.moreFeed();
  };

  render() {
    const { feed, match } = this.state;

    const feedBatch = _.reverse(feed.slice(0, 2));

    return (
      <div className="home">
        <Menu />

        {
          match && (
            <Match
              isAMatch={Boolean(match)}
              uri={match.uri}
              onClose={() => this.setState({ match: null })}
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

const mapStateToProps = state => ({
  profile: state.profile,
});

Home.propTypes = {
  profile: PropTypes.shape({
    mealsPerDay: PropTypes.number.isRequired,
    weeklyWalks: PropTypes.number.isRequired,
    hoursAlone: PropTypes.number.isRequired,
  }).isRequired
};

export default connect(mapStateToProps)(Home);
