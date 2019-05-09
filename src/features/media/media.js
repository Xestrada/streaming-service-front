import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import ReactPlayer from 'react-player';
import * as actions from '../common/redux/actions';
import * as mediaActions from './redux/actions';
import UserComment from '../common/userComment';
import './media.scss';

export class Media extends Component {
  static propTypes = {
      common: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      commonMedia: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);

      const { location } = this.props;
      const title = location.state === undefined
          ? location.pathname.replace('/media/', '')
          : location.state.title;
      const slotNum = location.state === undefined ? -1 : location.state.pageData;

      this.state = {
          slotNum,
          title,
          comment: '',
          collapse: false,
          stored: '',
          eps: '',
          rentModal: false,
          subModal: false,
          unsubModal: false,
          deleteModal: false,
          owned: false,
          ownershipChecked: false,
      };

      this.getComments = this.getComments.bind(this);
      this.makeComment = this.makeComment.bind(this);
      this.rentMovie = this.rentMovie.bind(this);
      this.addSlot = this.addSlot.bind(this);
      this.changeURL = this.changeURL.bind(this);
      this.toggleHidden = this.toggleHidden.bind(this);
      this.rentToggle = this.rentToggle.bind(this);
      this.subToggle = this.subToggle.bind(this);
      this.unsubToggle = this.unsubToggle.bind(this);
      this.getUserRating = this.getUserRating.bind(this);
      this.checkOwnership = this.checkOwnership.bind(this);
      this.unsubscribeToShow = this.unsubscribeToShow.bind(this);
      this.checkIfUnsub = this.checkIfUnsub.bind(this);
      this.deleteToggle = this.deleteToggle.bind(this);
      this.deleteSlot = this.deleteSlot.bind(this);
      this.checkIfDeletable = this.checkIfDeletable.bind(this);
  }


  componentDidMount() {
      const { actions } = this.props;
      const { getMedia } = actions;
      const { title } = this.state;
      getMedia(title).then(() => this.getComments(title))
          .then(() => {
              const { common } = this.props;
              const { media, authen } = common;
              if (authen) {
                  this.getUserRating(media);
                  this.checkIfUnsub();
              }
          });
  }

  getComments(title) {
      const { common, actions } = this.props;
      const { media } = common;
      const { movieComments, tvComments } = actions;
      if (media !== undefined) {
          if (media.season_info === undefined) {
              movieComments(title);
          } else {
              tvComments(title);
          }
      }
  }

  getUserRating(media) {
      const { common, actions } = this.props;
      const { getUserRating } = actions;
      const { userData } = common;
      if (media !== undefined && media.season_info !== undefined) {
          const isMovie = media.season_info === undefined;
          getUserRating(isMovie,
              parseInt(userData.id, 10),
              isMovie ? parseInt(media.movie_id, 10) : parseInt(media.tv_show_id, 10));
      }
  }

  deleteSlot() {
      const { actions, common } = this.props;
      const { slotNum } = this.state;
      const { deleteSlot } = actions;
      const { userData } = common;
      if (userData !== undefined && slotNum !== -1) {
          deleteSlot(parseInt(userData.id, 10), parseInt(slotNum, 10))
              .then(() => {
                  this.checkIfUnsub();
                  this.checkIfDeletable();
              });
      }
  }

  rentToggle() {
      this.setState(prevState => ({
          rentModal: !prevState.rentModal,
      }));
  }

  subToggle() {
      this.setState(prevState => ({
          subModal: !prevState.subModal,
      }));
  }

  unsubToggle() {
      this.setState(prevState => ({
          unsubModal: !prevState.unsubModal,
      }));
  }

  deleteToggle() {
      this.setState(prevState => ({
          deleteModal: !prevState.deleteModal,
      }));
  }

  rentMovie() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { rentMovie } = actions;

      rentMovie({
          movie_id: parseInt(media.movie_id, 10),
          user_id: parseInt(userData.id, 10),
      }).then(this.checkOwnership);
  }

  addSlot() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { subTv } = actions;

      subTv({
          tv_show_id: parseInt(media.tv_show_id, 10),
          user_id: parseInt(userData.id, 10),
      }).then(this.checkOwnership);
  }

  rateMedia(rating) {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { rateMovie, rateTv } = actions;

      if (media.season_info === undefined) {
          rateMovie({
              rating,
              user_id: parseInt(userData.id, 10),
              movie_id: parseInt(media.movie_id, 10),
          }).then(() => {
              const { actions, common } = this.props;
              const { media } = common;
              const { getMedia } = actions;
              const { title } = this.state;
              this.getUserRating(media);
              getMedia(title);
          });
      } else {
          rateTv({
              rating,
              user_id: parseInt(userData.id, 10),
              tv_show_id: parseInt(media.tv_show_id, 10),
          }).then(() => {
              const { actions, common } = this.props;
              const { media } = common;
              const { getMedia } = actions;
              const { title } = this.state;
              this.getUserRating(media);
              getMedia(title);
          });
      }
  }

  makeComment() {
      const { common, actions } = this.props;
      const { comment, title } = this.state;
      const { media, userData } = common;
      const { makeTvComment, makeMovieComment } = actions;

      if (media !== undefined) {
          if (media.season_info === undefined) {
              makeMovieComment({
                  comment,
                  user_id: parseInt(userData.id, 10),
                  movie_id: parseInt(media.movie_id, 10),
              }).then(() => this.getComments(title));
          } else {
              makeTvComment({
                  comment,
                  user_id: parseInt(userData.id, 10),
                  tv_show_id: parseInt(media.tv_show_id, 10),
              }).then(() => this.getComments(title));
          }

          this.setState({
              comment: '',
          });
      }
  }

  toggleHidden(index) {
      this.setState((prevState) => {
          const seasons = [...prevState.collapse];
          seasons[index] = !prevState.collapse[index];

          return {
              collapse: seasons,
          };
      },
      );
  }

  changeURL(url, title, episode) {
      this.setState({
          videoURL: url,
          stored: title,
          eps: episode,
      });
  }

  checkOwnership() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { isMediaOwned } = actions;
      const isMovie = media.season_info === undefined;
      isMediaOwned(isMovie, parseInt(userData.id, 10),
          isMovie ? parseInt(media.movie_id, 10) : parseInt(media.tv_show_id, 10))
          .then(() => {
              const { commonMedia } = this.props;
              const { mediaOwned } = commonMedia;
              this.setState({
                  owned: mediaOwned,
                  ownershipChecked: true,
              });
          });
  }

  checkIfUnsub() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { isUnsubbed } = actions;
      isUnsubbed(parseInt(userData.id, 10), parseInt(media.tv_show_id, 10));
  }

  checkIfDeletable() {
      const { common, actions } = this.props;
      const { isSlotDeletable } = actions;
      const { userData } = common;
      isSlotDeletable(parseInt(userData.id, 10));
  }

  unsubscribeToShow() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { unsubscribe } = actions;
      if (userData !== undefined) {
          unsubscribe(parseInt(userData.id, 10), parseInt(media.tv_show_id, 10))
              .then(() => {
                  this.checkIfUnsub();
                  this.unsubToggle();
                  this.checkIfDeletable();
              });
      }
  }

  render() {
      const {
          slotNum,
          title,
          comment,
          videoURL,
          collapse,
          stored,
          eps,
          rentModal,
          subModal,
          deleteModal,
          unsubModal,
          owned,
          ownershipChecked,
      } = this.state;
      const { common, commonMedia } = this.props;
      const { media, mediaError, authen, isSlotDeletable } = common;
      const { comments,
          userRating,
          isUnsubbed,
          getUserRatingPending,
          getUserRatingError,
          unsubscribePending,
          deleteSlotPending,
          isMediaOwnedPending,
          rateTvPending,
          rateMoviePending,
          rentMoviePending,
          subTvPending,
          makeMovieCommentPending,
          makeTvCommentPending,
      } = commonMedia;

      // Get user rating if we havent requested it yet.
      if (media !== undefined && authen && userRating === undefined
         && !getUserRatingPending && (getUserRatingError === null || getUserRatingError === undefined)) {
          this.getUserRating(media);
      }

      // Check ownership
      if (media !== undefined && authen && !ownershipChecked && !isMediaOwnedPending && media.title === title) {
          this.checkOwnership();
          this.checkIfUnsub();
          this.checkIfDeletable();
      }

      const ratePending = (rateTvPending || rateMoviePending);

      const deleteButton = authen && owned && media !== undefined && media.season_info !== undefined
            && slotNum !== -1 && isSlotDeletable
          ? (
              <Button disabled={deleteSlotPending} className='userOption' color='danger' onClick={this.deleteToggle}>Delete Slot</Button>
          ) : null;

      const unsub = authen && owned && media !== undefined && media.season_info !== undefined ? (
          <Button disabled={unsubscribePending} className='userOption' color='primary' onClick={this.unsubToggle}>Unsubscribe</Button>
      ) : null;

      const unsubOptions = isUnsubbed !== undefined && isUnsubbed ? (
          <h1>You have unsubscribed to this media</h1>
      ) : unsub;

      const mediaURL = media !== undefined && media.season_info === undefined ? media.url : videoURL;

      const commentElems = comments !== undefined ? comments.map(comment => (
          <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
      )) : null;

      const seasonInfo = (media !== undefined && media.season_info !== undefined) ? media.season_info.map((content) => {
          const episodeInfo = (content.episodes !== undefined) ? content.episodes.map(item => (
              <div>
                  <span>
                      <li //eslint-disable-line
                        onClick={() => this.changeURL(item.url, item.episode_name, item.episode)} //eslint-disable-line
                        style={{ cursor: 'pointer' }} // eslint-disable-line
                      >
                          Episode
                          {' '}
                          {item.episode}
                          :
                          {' '}
                          {' '}
                          {item.episode_name}
                          {' '}
                      </li>
                      {item.episode.clicked && item.episode_name}
                  </span>
              </div>
          )) : null;

          return (
              <div>
                  {' '}
                  <Button className='season-position' onClick={() => this.toggleHidden(content.season)} style={{ textAlign: 'left', marginBottom: '1rem' }}>
                      <li>
Season:
                          {' '}
                          {content.season}
                      </li>
                  </Button>
                  {collapse[content.season] && episodeInfo}

              </div>
          );
      }) : null;

      const deleteModalElem = (
          <Modal isOpen={deleteModal} toggle={this.deleteToggle}>
              <ModalHeader toggle={this.deleteToggle} className='centerModalHeader'>Are you sure?</ModalHeader>
              <ModalBody className='modalBody'>
                Are you sure you want to delete this slot?
                (This show will be unsubscribed and the slot will be deleted at the next pay period)
              </ModalBody>
              <ModalFooter>
                  <Button className='btn btn-primary btn-md' color='primary' onClick={() => { this.deleteSlot(); this.deleteToggle(); }}>
                  Yes, delete
                  </Button>
                  <Button color='secondary' onClick={this.deleteToggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
      );

      const unsubModalElem = (
          <Modal isOpen={unsubModal} toggle={this.unsubToggle}>
              <ModalHeader toggle={this.unsubToggle} className='centerModalHeader'>Are you sure?</ModalHeader>
              <ModalBody className='modalBody'>
                Are you sure you want to unsubscribe?
                (You will be able to choose a new show at the end of the pay period)
              </ModalBody>
              <ModalFooter>
                  <Button className='btn btn-primary btn-md' color='primary' onClick={this.unsubscribeToShow}>
                    Yes, unsubscribe
                  </Button>
                  <Button color='secondary' onClick={this.unsubToggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
      );

      const rentModalElem = (
          <Modal isOpen={rentModal} toggle={this.rentToggle}>
              <ModalHeader toggle={this.rentToggle} className='centerModalHeader'>Are you sure?</ModalHeader>
              <ModalBody className='modalBody'>
              Do you wish to rent this movie?
              (You will be charged $0.50 for a 24hr rental)
              </ModalBody>
              <ModalFooter>
                  <Button disabled={rentMoviePending} className='btn btn-primary btn-md' color='primary' onClick={() => { this.rentMovie(); this.rentToggle(); }}>
                    Yes, rent this movie
                  </Button>
                  <Button color='secondary' onClick={this.rentToggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
      );

      const subModalElem = (
          <Modal isOpen={subModal} toggle={this.subToggle}>
              <ModalHeader toggle={this.subToggle} className='centerModalHeader'>Are you sure?</ModalHeader>
              <ModalBody className='modalBody'>
              Do you wish to subscribe this tv show?
              (You will be charged $1.50 extra each month for this slot)
              </ModalBody>
              <ModalFooter>
                  <Button disabled={subTvPending} className='btn btn-primary btn-md' color='primary' onClick={() => { this.addSlot(); this.subToggle(); }}>
                  Yes, subscribe this tv show
                  </Button>
                  <Button color='secondary' onClick={this.subToggle}>Cancel</Button>
              </ModalFooter>
          </Modal>
      );

      const commentContainer = authen ? (
          <div id='media-comment-container'>
              <div id='media-comment-label'>
                  <label htmlFor='Comment' style={{ textDecoration: 'underline', fontFamily: 'Apple Chancery, cursive' }}>Leave a comment</label>
              </div>
              <textarea
                  value={comment} //eslint-disable-line
                  onChange={(e) => { //eslint-disable-line
                      this.setState({
                          comment: e.target.value,
                      });
                  }}
                  id='subject' //eslint-disable-line
                  name='subject' //eslint-disable-line
                  placeholder='Enter your comment here...' //eslint-disable-line
                  style={{ borderStyle: 'inset', width: '38.5rem', height: '7rem' }} //eslint-disable-line
              />
              <div className='row'>
                  <input disabled={makeTvCommentPending || makeMovieCommentPending} style={{ float: 'right' }} type='submit' value='Post Comment' onClick={this.makeComment} />
              </div>
          </div>
      ) : null;

      const StarRating = (authen !== undefined && authen && media !== undefined) ? (
          <div className='rate'>
              <input disabled={ratePending} type='radio' id='star5' name='rate' value='5' checked={userRating === 5 || onclick} onClick={() => this.rateMedia(5)} />
              <label htmlFor='star5'>5 stars</label>
              <input disabled={ratePending} type='radio' id='star4' name='rate' value='4' checked={userRating === 4 || onclick} onClick={() => this.rateMedia(4)} />
              <label htmlFor='star4'>4 stars</label>
              <input disabled={ratePending} type='radio' id='star3' name='rate' value='3' checked={userRating === 3 || onclick} onClick={() => this.rateMedia(3)} />
              <label htmlFor='star3'>3 stars</label>
              <input disabled={ratePending} type='radio' id='star2' name='rate' value='2' checked={userRating === 2 || onclick} onClick={() => this.rateMedia(2)} />
              <label htmlFor='star2'>2 stars</label>
              <input disabled={ratePending} type='radio' id='star1' name='rate' value='1' checked={userRating === 1 || onclick} onClick={() => this.rateMedia(1)} />
              <label htmlFor='star1'>1 star</label>
          </div>
      ) : null;

      const genreInfo = (media !== undefined && media.genres !== undefined) ? media.genres.map((item, index) => (
          <span
              style={{ color: 'whitesmoke', fontSize: '1em' }} //eslint-disable-line
              key={`demo_snap_${index}`} //eslint-disable-line
          >
              { (index ? ', ' : '') + item }
          </span>
      )) : null;

      const starInfo = (media !== undefined && media.genres !== undefined && media.stars !== undefined && media.stars !== null) ? media.stars.map((item, index) => (
          <span
              style={{ color: 'whitesmoke', fontSize: '1em' }} //eslint-disable-line
              key={`demo_snap_${index}`} //eslint-disable-line
          >
              { (index ? ', ' : '') + item }
          </span>
      )) : null;

      const error = mediaError !== undefined ? <h1>Error</h1> : null;

      const mediaElems = media !== undefined ? (
          <div className='mediaBody'>
              {subModalElem}
              {rentModalElem}
              {unsubModalElem}
              {deleteModalElem}
              <h1 style={{ textAlign: 'center', fontSize: '3.5em', fontWeight: 'bold' }}>
                  {' '}
                  {media.title}
                  {' '}
              </h1>

              {stored !== '' && eps !== '' && (
                  <h1 style={{ textAlign: 'center', fontSize: '1.5em' }}>
                    Episode
                      {' '}
                      {eps}
                    :
                      {' '}
                      {stored}
                  </h1>
              )}

              <ReactPlayer id='media-box' url={authen && owned ? mediaURL : ''} controls />
              <div id='clearFix'>
                  <h1>
                      <img src={media.image_url} alt='Cover art' className='boxArt' />
                      {media.title || title}
                      {' '}
                      <span>
                        (
                          {media.year}
                        )

                      </span>
                      {media.season_info !== undefined && <h3>SEASONS</h3>}
                      {media.season_info !== undefined && <div id='overflowBox'>{seasonInfo}</div>}
                  </h1>
              </div>

              <div id='clearFix' style={{ overflow: 'hidden', marginTop: '0.8%' }}>
                  {media.season_info === undefined && authen && !owned && <Button color='primary' className='rent-button' onClick={this.rentToggle}>Rent</Button>}
                  {media.season_info !== undefined && authen && !owned && <Button color='primary' className='subscribe-button' onClick={this.subToggle}>Subscribe</Button>}
                  {unsubOptions}
                  {deleteButton}
                  {owned && StarRating}
              </div>
              <div id='media-info'>
                  <h2>
                    STARS:
                      {' '}
                      {starInfo}
                  </h2>

                  <h2>
                    Genres:
                      {' '}
                      {genreInfo}
                  </h2>
                  <h2>
                    Average Rating:
                      {' '}
                      <span style={{ color: 'white' }}>{media.avg_rating}</span>
                  </h2>
                  <h2>SYNOPSIS</h2>
                  <p>{media.description}</p>
              </div>
              {owned && commentContainer}
              {commentElems}
          </div>
      ) : null;

      return (
          <body id='bg'>
              <div className='media-default-page'>
                  {mediaElems || error}
              </div>
          </body>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        commonMedia: state.media,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions, ...mediaActions }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Media);
