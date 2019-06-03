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
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { feed: [], profile: this.props.profile };
  }

  async componentDidMount() {
    const { profile } = this.state;
    const feed = await this.buildFeed(10);

    this.setState({ feed, profile });
  }

  buildFeed = async size => {
    const chance = new Chance();

    const buildFeedItem = async () => {
      const pet = await getPet();
      const { mealsPerDay, weeklyWalks, hoursAlone } = this.state.profile;
      let like;
      if (pet.type === 'dog') {
        like = mealsPerDay * 0.4 + weeklyWalks * 0.8 - hoursAlone * 0.4 > 5;
      } else if (pet.type === 'cat') {
        like = mealsPerDay * 0.5 - weeklyWalks * 0.4 + hoursAlone * 0.6 > 5;
      }
      return {
        uri: pet.image,
        type: pet.type,
        summary: {
          name: chance.first(),
          age: chance.age({ type: 'child' }),
          breed: pet.breed,
          description: chance.paragraph({ sentences: 5 }),
        },
        like,
      };
    };

    return Promise.all([...Array(size).keys()].map(buildFeedItem));
  };

  onRightSwipe = feedItem => {
    const { feed, profile } = this.state;
    console.log(feedItem.like);
    if (feedItem.like) {
      console.log('match!');
    }

    this.setState({ feed: feed.slice(1), profile });
  };

  onLeftSwipe = () => {
    const { feed, profile } = this.state;

    this.setState({ feed: feed.slice(1), profile });
  };

  render() {
    const { feed } = this.state;

    const feedBatch = _.reverse(feed.slice(0, 2));

    return (
      <div className="home">
        <Menu />

        {feedBatch.map(feedItem => (
          <div key={feedItem.summary.name + feedItem.uri} className="tinder-swipeable-wrapper">
            <TinderSwipeable
              node={<Image uri={feedItem.uri} />}
              threshold={0.5}
              onRightSwipe={() => this.onRightSwipe(feedItem)}
              onLeftSwipe={this.onLeftSwipe}
            />

            <Summary summary={feedItem.summary} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profile } = state;
  return { profile };
};

export default connect(mapStateToProps)(Home);
