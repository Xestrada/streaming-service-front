import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actions from '../common/redux/actions';
import * as profileActions from '../profile/redux/actions';
import ContentBox from '../common/contenBox';
import Rating from '../common/rating';
import TimelinePost from '../common/timelinePost';
import CommentContainer from '../common/commentContainer';
import emptyImg from '../../images/noimage.png';
import userImg from '../../images/blank-user.jpg';
import './user.scss';

export class User extends Component {
  static propTypes = {
      actions: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
      common: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired,
      profileActions: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);

      const { match } = this.props;
      const { params } = match;
      const { username, id } = params;

      this.state = {
          username,
          id,
          userPost: '',
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
      this.declineRequest = this.declineRequest.bind(this);
      this.acceptRequest = this.acceptRequest.bind(this);
      this.getWall = this.getWall.bind(this);
      this.postOnTimeline = this.postOnTimeline.bind(this);

  }

  componentDidMount() {
      this.getUserShows();
      this.getRatedMovies();
      this.getRatedTV();
      this.getRentedMovies();
      this.getFriendship();
      this.hasRequestStatus();
      this.sentFriendRequest();
      this.getWall();
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

  getWall() {
      const { profileActions } = this.props;
      const { id } = this.state;
      const { getWall } = profileActions;
      getWall(id);
  }

  hasRequestStatus() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { hasFreindRequest } = actions;
      if (userData !== undefined) {
          hasFreindRequest(
              parseInt(userData.id, 10), parseInt(id, 10),
          );
      }
  }

  sentFriendRequest() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { sentFriendRequest } = actions;
      if (userData !== undefined) {
          sentFriendRequest(
              parseInt(userData.id, 10), parseInt(id, 10),
          );
      }
  }

  addFriend() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { addFriend } = actions;
      addFriend({
          request_from: parseInt(userData.id, 10),
          request_to: parseInt(id, 10),
      }).then(this.sentFriendRequest);
  }

  removeFriend() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { removeFriend, checkFriendship } = actions;
      removeFriend(
          parseInt(userData.id, 10),
          parseInt(id, 10),
      ).then(() => checkFriendship(userData.id, id));
  }

  declineRequest() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { declineRequest } = actions;
      declineRequest({
          user_id: parseInt(userData.id, 10),
          request_from: parseInt(id, 10),
      }).then(this.hasRequestStatus);
  }

  acceptRequest() {
      const { actions, common } = this.props;
      const { id } = this.state;
      const { userData } = common;
      const { acceptFreind } = actions;
      acceptFreind({
          user_id: parseInt(userData.id, 10),
          request_from: parseInt(id, 10),
      }).then(() => {
          this.hasRequestStatus();
          this.getFriendship();
      });
  }

  postOnTimeline() {
      const { common, profileActions } = this.props;
      const { userPost, id } = this.state;
      const { userData } = common;
      const { postTimeline } = profileActions;
      postTimeline({
          wall_id: parseInt(id, 10),
          user_id: parseInt(userData.id, 10),
          post: userPost,
      }).then(() => {
          this.getWall();
          this.setState({
              userPost: '',
          });
      });
  }

  render() {

      const { common, profile } = this.props;
      const { username, userPost } = this.state;
      const { wall, getWallPending, getWallError } = profile;
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
          acceptFreindPending,
          declineRequestPending,
          removeFriendPending,
          addFriendPending,
      } = common;

      const friendAction = (areFriends !== undefined && areFriends)
          ? (<Button disabled={removeFriendPending} color='danger' onClick={this.removeFriend}>Remove Friend</Button>)
          : (<Button disabled={addFriendPending} color='primary' onClick={this.addFriend}>Send Friend Request</Button>);

      const friendButton = (authen !== undefined && authen) ? friendAction : null;

      const friendLabel = (sentFriendRequest !== undefined && sentFriendRequest) ? (<h2 className='request'>Friend Request Sent</h2>) : null;

      const friendOptions = (hasFreindRequest !== undefined && hasFreindRequest) ? (
          <div className='optionButtons'>
              <Button disabled={acceptFreindPending || declineRequestPending} color='primary' onClick={this.acceptRequest}>Accept Request</Button>
              <br />
              <br />
              <Button disabled={acceptFreindPending || declineRequestPending} color='danger' onClick={this.declineRequest}>Decline Request</Button>
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

      const userWall = wall !== undefined && !getWallPending ? wall.map(post => (
          <div>
              <TimelinePost
                    postedTo={post.username} //eslint-disable-line
                    name={post.post_username} //eslint-disable-line
                    message={post.post} //eslint-disable-line
                    comments={post.comments} //eslint-disable-line
                    postId={post.post_id} //eslint-disable-line
                    refreshFunc={this.getWall} //eslint-disable-line
                    areFriends={areFriends !== undefined && areFriends} //eslint-disable-line
              />
          </div>
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
                  <div className='userInfo'>
                      <div className='userHolder'>
                          <img src={userImg} alt='User' />
                          <h5 className='userName'>{username}</h5>
                          {friendOptions || friendLabel || friendButton}
                      </div>
                  </div>
                  <div className='gridContainer'>
                      <h1>Wall</h1>
                      {getWallPending ? loading : (
                          <div>
                              <div className='postContainer'>
                                  {areFriends
                                    && (
                                        <CommentContainer
                                            comment={userPost} //eslint-disable-line
                                            title='Post to Timeline' //eslint-disable-line
                                            buttonText='Post' //eslint-disable-line
                                            placeHolderText='Enter your comment here...' //eslint-disable-line
                                            buttonFunc={this.postOnTimeline} //eslint-disable-line
                                            changeFunc={(value) => { //eslint-disable-line
                                                this.setState({
                                                    userPost: value,
                                                });
                                            }}
                                        />
                                    )}
                              </div>
                              {userWall}
                          </div>
                      )}
                      {getWallError && (<h1>Wall Error</h1>)}
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
        profile: state.profile,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        profileActions: bindActionCreators({ ...profileActions }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(User);
