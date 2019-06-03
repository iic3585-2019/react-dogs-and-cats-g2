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

  buildFeed = async size => {
    const chance = new Chance();

    const buildFeedItem = async () => {
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

    return Promise.all([...Array(size).keys()].map(buildFeedItem));
  };

  onRightSwipe = feedItem => {
    const { profile: { mealsPerDay, weeklyWalks, hoursAlone } } = this.props;
    const { feed } = this.state;

    let x = 0;

    if (feedItem.type === 'dog')
      x = (mealsPerDay - 3) + (weeklyWalks - 5) - (hoursAlone - 8);
    else if (feedItem.type === 'cat')
      x = (mealsPerDay - 6) - (weeklyWalks - 2) + (hoursAlone - 10);

    const like = Math.random() <= toProbability(x);

    this.setState({
      feed: feed.slice(1),
      match: like ? feedItem : null,
    });
  };

  onLeftSwipe = () => {
    const { feed } = this.state;

    this.setState({ feed: feed.slice(1) });
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
