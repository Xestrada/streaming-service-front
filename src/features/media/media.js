import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
} from 'reactstrap';
import ReactPlayer from 'react-player';
import * as actions from '../common/redux/actions';
import * as mediaActions from './redux/actions';
import UserComment from '../common/userComment';
import Header from '../common/header';
import Footer from '../common/footer';
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
      const { title } = location.state;

      this.state = {
          title,
          comment: '',
          rating: 0,
          collapse: false,
      };

      this.getComments = this.getComments.bind(this);
      this.makeComment = this.makeComment.bind(this);
      this.rentMovie = this.rentMovie.bind(this);
      this.addSlot = this.addSlot.bind(this);
      this.changeURL = this.changeURL.bind(this);
      this.toggleHidden = this.toggleHidden.bind(this);
  }


  componentDidMount() {
      const { actions } = this.props;
      const { getMedia } = actions;
      const { title } = this.state;
      getMedia(title).then(() => this.getComments(title));
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

  makeComment() {
      const { common, actions } = this.props;
      const { comment, title } = this.state;
      const { media, userData } = common;
      const { makeTvComment, makeMovieComment } = actions;

      if (media !== undefined) {
          if (media.season_info === undefined) {
              makeMovieComment({
                  comment,
                  user_id: userData.id,
                  movie_id: media.movie_id,
              }).then(() => this.getComments(title));
          } else {
              makeTvComment({
                  comment,
                  user_id: userData.id,
                  tv_show_id: media.tv_show_id,
              }).then(() => this.getComments(title));
          }
      }
  }

  rentMovie() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { rentMovie } = actions;

      rentMovie({
          movie_id: media.movie_id,
          user_id: userData.id,
      });
  }

  addSlot() {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { subTv } = actions;

      subTv({
          tv_show_id: media.tv_show_id,
          user_id: userData.id,
      });
  }

  rateMedia(rating) {
      const { common, actions } = this.props;
      const { media, userData } = common;
      const { rateMovie, rateTv } = actions;

      this.setState({
          rating,
      });

      if (media.season_info === undefined) {
          rateMovie({
              rating,
              user_id: userData.id,
              movie_id: media.movie_id,
          });
      } else {
          rateTv({
              rating,
              user_id: userData.id,
              tv_show_id: media.tv_show_id,
          });
      }
  }

  changeURL(url) {
      this.setState({
          videoURL: url,
      });
  }

  render() {
      const { title, comment, rating, videoURL, collapse } = this.state;
      const { common, commonMedia } = this.props;
      const { media, mediaError, authen } = common;
      const { comments } = commonMedia;

      const mediaURL = media !== undefined && media.season_info === undefined ? media.url : videoURL;

      const commentElems = comments !== undefined ? comments.map(comment => (
          <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
      )) : null;
      const seasonInfo = (media !== undefined && media.season_info !== undefined) ? media.season_info.map((content) => {
          const episodeInfo = (content.episodes !== undefined) ? content.episodes.map(item => (
              <div>
                  <span>
                      <li onClick={() => this.changeURL(item.url)} style={{cursor:'pointer'}}>
Episode
                          {' '}
                          {item.episode}
:
                          {' '}
                          {' '}
                          {item.episode_name}
                          {' '}
                      </li>

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

      const commentContainer = authen ? (
          <div id='comment-container'>
              <div id='comment-header'>
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
                  style={{ borderStyle: 'inset', width: '600px', height: '90px' }} //eslint-disable-line
              />
              <div className='row'>
                  <input style={{ marginLeft: '52%' }} type='submit' value='Post Comment' onClick={this.makeComment} />
              </div>
          </div>
      ) : null;

      const StarRating = (authen !== undefined && authen && media !== undefined) ? (
          <div className='rate'>
              <input type='radio' id='star5' name='rate' value='5' checked={rating === 5 || onclick} onClick={() => this.rateMedia(5)} />
              <label htmlFor='star5' title='text'>5 stars</label>
              <input type='radio' id='star4' name='rate' value='4' checked={rating === 4 || onclick} onClick={() => this.rateMedia(4)} />
              <label htmlFor='star4' title='text'>4 stars</label>
              <input type='radio' id='star3' name='rate' value='3' checked={rating === 3 || onclick} onClick={() => this.rateMedia(3)} />
              <label htmlFor='star3' title='text'>3 stars</label>
              <input type='radio' id='star2' name='rate' value='2' checked={rating === 2 || onclick} onClick={() => this.rateMedia(2)} />
              <label htmlFor='star2' title='text'>2 stars</label>
              <input type='radio' id='star1' name='rate' value='1' checked={rating === 1 || onclick} onClick={() => this.rateMedia(1)} />
              <label htmlFor='star1' title='text'>1 star</label>
          </div>
      ) : null;
      const genreInfo = (media !== undefined && media.genres !== undefined) ? media.genres.map((item, index) => <span style={{ color: 'whitesmoke', fontSize: '1em' }} key={`demo_snap_${index}`}>{ (index ? ', ' : '') + item }</span>) : null;
      const starInfo = (media !== undefined && media.genres !== undefined) ? media.stars.map((item, index) => <span style={{ color: 'whitesmoke', fontSize: '1em' }} key={`demo_snap_${index}`}>{ (index ? ', ' : '') + item }</span>) : null;
      const error = mediaError !== undefined ? <h1>Error</h1> : null;
      const mediaElems = media !== undefined ? (
          <div className='mediaBody'>
              {console.log(media)}
              <ReactPlayer id='media-box' url={authen ? mediaURL : ''} controls />

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
                  {media.season_info === undefined && authen && <Button color='danger' className='rent-button' onClick={this.rentMovie}>Rent</Button>}
                  {media.season_info !== undefined && authen && <Button color='danger' className='subscribe-button' onClick={this.addSlot}>Subscribe</Button>}
                  {StarRating}
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
              {commentContainer}
              {commentElems}
          </div>
      ) : null;

      return (
          <body id='bg'>
              <div className='media-default-page'>
                  <Header />
                  {mediaElems || error}
                  <Footer />
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
