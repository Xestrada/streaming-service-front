import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import ContentBox from '../common/contenBox';
import Footer from '../common/footer';
import Rating from '../common/rating';
import emptyImg from '../../images/noimage.png';
import userImg from '../../images/blank-user.jpg';
import './user.scss';

export class User extends Component {
  static propTypes = {
      actions: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      common: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);

      const { match } = this.props;
      const { params } = match;
      const { username, id } = params;

      this.state = {
          username,
          id,
      };

      this.getUserShows = this.getUserShows.bind(this);
      this.getRatedMovies = this.getRatedMovies.bind(this);
      this.getRatedTV = this.getRatedTV.bind(this);
      this.getRentedMovies = this.getRentedMovies.bind(this);
      this.getFriendship = this.getFriendship.bind(this);
      this.removeFriend = this.removeFriend.bind(this);
      this.addFriend = this.addFriend.bind(this);
      this.hasRequestStatus = this.hasRequestStatus.bind(this);
      this.sentFriendRequest = this.sentFriendRequest.bind(this);

  }

  componentDidMount() {
      this.getUserShows();
      this.getRatedMovies();
      this.getRatedTV();
      this.getRentedMovies();
      this.getFriendship();
      this.hasRequestStatus();
      this.sentFriendRequest();
  }

  getUserShows() {
      const { actions } = this.props;
      const { getSubs } = actions;
      const { id } = this.state;
      getSubs(id);
  }

  getRatedMovies() {
      const { actions } = this.props;
      const { ratedMovies } = actions;
      const { id } = this.state;
      ratedMovies(id);
  }

  getRatedTV() {
      const { actions } = this.props;
      const { ratedTv } = actions;
      const { id } = this.state;
      ratedTv(id);
  }

  getRentedMovies() {
      const { actions } = this.props;
      const { getRented } = actions;
      const { id } = this.state;
      getRented(id);
  }

  getFriendship() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { authen, userData } = common;
      const { checkFriendship } = actions;

      if (authen) {
          checkFriendship(userData.id, id);
      }
  }

  removeFriend() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { removeFriend, checkFriendship } = actions;

      removeFriend(userData.id, id).then(() => checkFriendship(userData.id, id));
  }

  addFriend() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { addFriend } = actions;
      addFriend({
          user_id: userData.id,
          pending_friend_id: id,
      }).then(this.checkRequestStatus);
  }

  hasRequestStatus() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { hasFreindRequest } = actions;
      if (userData !== undefined) {
          hasFreindRequest(userData.id, id);
      }
  }

  sentFriendRequest() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { sentFriendRequest } = actions;
      if (userData !== undefined) {
          sentFriendRequest(userData.id, id);
      }
  }

  render() {

      const { common } = this.props;
      const { username } = this.state;
      const {
          authen,
          subs,
          ratedMovies,
          ratedTV,
          rentedMovies,
          getRentedPending,
          ratedTvPending,
          ratedMoviesPending,
          subsPending,
          areFriends,
          checkFriendshipPending,
          hasFreindRequest,
          sentFriendRequest,
      } = common;

      const friendAction = (areFriends !== undefined && areFriends) ? (<Button color='danger' onClick={this.removeFriend}>Remove Friend</Button>) : (<Button color='primary' onClick={this.addFriend}>Send Friend Request</Button>);

      const friendButton = (authen !== undefined && authen) ? friendAction : null;

      const friendLabel = (sentFriendRequest !== undefined && sentFriendRequest) ? (<h2 className='request'>Friend Request Sent</h2>) : null;

      const friendOptions = (hasFreindRequest !== undefined && hasFreindRequest) ? (
          <div>
              <Button color='primary'>Accept Request</Button>
              <Button color='danger'>Decline Request</Button>
          </div>
      ) : null;

      const subbedTV = subs !== undefined ? subs.map(content => (
          <div className='media'>
              <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
          </div>
      )) : null;

      const ratedMoviesList = (ratedMovies !== undefined) ? ratedMovies.map(movie => (
          <div>
              <div>
                  <ContentBox title={movie.movie_title} url={`/media/${movie.movie_title}`} image={movie.image_url || emptyImg} />
              </div>
              <div>
                  <Rating rating={movie.rating} />
              </div>
          </div>
      )) : null;

      const ratedTVList = (ratedTV !== undefined) ? ratedTV.map(content => (
          <div>
              <div>
                  <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
              </div>
              <div>
                  <Rating rating={content.rating} />
              </div>
          </div>
      )) : null;

      const rentedList = rentedMovies !== undefined ? rentedMovies.map(movie => (
          <ContentBox title={movie.title} url={`/media/${movie.title}`} image={movie.image_url || emptyImg} />
      )) : null;

      const empty = (<h2>No Content</h2>);

      const loading = <i className='fa fa-spinner fa-spin loadIcon loadingSpinner' />;

      if (authen && areFriends === undefined && !checkFriendshipPending) {
          this.getFriendship();
          this.hasRequestStatus();
          this.sentFriendRequest();
      }

      return (
          <div className='background-color'>
              <div>
                  <Header />
                  <div className='userInfo'>
                      <div className='userHolder'>
                          <img src={userImg} alt='User' />
                          <h5>{username}</h5>
                          {friendOptions || friendLabel || friendButton}
                      </div>
                  </div>
                  <br />
                  <div className='gridContainer'>
                      <h1>Slots</h1>
                      <div className='section'>
                          {subsPending ? loading : (subbedTV || empty)}
                      </div>
                  </div>

                  <div className='gridContainer'>
                      <h1>Rented</h1>
                      <div className='section'>
                          {getRentedPending ? loading : (rentedList || empty)}
                      </div>
                  </div>

                  <div className='gridContainer'>
                      <h1>Rated Movies</h1>
                      <div className='section'>
                          {ratedMoviesPending ? loading : (ratedMoviesList || empty)}
                      </div>
                  </div>

                  <div className='gridContainer'>
                      <h1>Rated TV Shows</h1>
                      <div className='section'>
                          {ratedTvPending ? loading : (ratedTVList || empty)}
                      </div>
                  </div>

                  <Footer />
              </div>
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        user: state.user,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(User);
