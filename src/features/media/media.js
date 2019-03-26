import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
    UncontrolledCollapse,
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
      };

      this.getComments = this.getComments.bind(this);
      this.makeComment = this.makeComment.bind(this);
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

  makeComment() {
      const { common, actions } = this.props;
      const { comment } = this.state;
      const { media, userData } = common;
      const { makeTvComment, makeMovieComment } = actions;

      if (media !== undefined) {
          if (media.season_info === undefined) {
              makeMovieComment({
                  comment,
                  user_id: userData.id,
                  movie_id: media.id,
              });
          } else {
              makeTvComment({
                  comment,
                  user_id: userData.id,
                  tv_show_id: media.id,
              });
          }
      }

  }

  render() {
      const { title, comment } = this.state;
      const { common, commonMedia } = this.props;
      const { media, mediaError, authen } = common;
      const { comments } = commonMedia;

      const commentElems = comments !== undefined ? comments.map(comment => (
          <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
      )) : null;

      const seasonInfo = (media !== undefined && media.season_info !== undefined) ? media.season_info.map((content) => {

          const episodeInfo = (content.episodes !== undefined) ? content.episodes.map(item => (
              <div>
                  <span>
                      <li>
                        Episode
                          {item.episode}
                        :
                          {item.episode_name}
                      </li>

                  </span>
              </div>
          )) : null;

          return (
              <div>
                  {' '}
                  <Button className='season-position' onClick={this.toggleHidden} id='toggler' style={{ textAlign: 'left', marginBottom: '1rem' }}>
                      <li>
                        Season:
                          {content.season}
                      </li>
                  </Button>
                  <UncontrolledCollapse className='episdoes-position' toggler='#toggler'>
                      {episodeInfo}
                  </UncontrolledCollapse>
              </div>
          );

      }) : null;

      const commentContainer = authen ? (
          <div className='comment-container'>
              <div className='comment-header'>
                  <label htmlFor='Comment' style={{ textDecoration: 'underline', fontFamily: 'Apple Chancery, cursive' }}>Leave a comment</label>
              </div>
              <textarea
                  value={comment}
                  onChange={(e) => {
                      this.setState({
                          comment: e.target.value,
                      });
                  }}
                  id='subject'
                  name='subject'
                  placeholder='Enter your comment here...'
                  style={{ borderStyle: 'inset', width: '600px', height: '90px' }}
              />
              <div className='row'>
                  <input type='submit' value='Post Comment' onClick={this.makeComment} />
              </div>
          </div>
      ) : null;

      const StarRating = (authen !== undefined && authen && media !== undefined) ? (
          <div className='rate'>
              <input type='radio' id='star5' name='rate' value='5' checked={Math.round(media.avg_rating) === 5 || onclick} />
              <label htmlFor='star5' title='text'>5 stars</label>
              <input type='radio' id='star4' name='rate' value='4' checked={Math.round(media.avg_rating) === 4 || onclick} />
              <label htmlFor='star4' title='text'>4 stars</label>
              <input type='radio' id='star3' name='rate' value='3' checked={Math.round(media.avg_rating) === 3 || onclick} />
              <label htmlFor='star3' title='text'>3 stars</label>
              <input type='radio' id='star2' name='rate' value='2' checked={Math.round(media.avg_rating) === 2 || onclick} />
              <label htmlFor='star2' title='text'>2 stars</label>
              <input type='radio' id='star1' name='rate' value='1' checked={Math.round(media.avg_rating) === 1 || onclick} />
              <label htmlFor='star1' title='text'>1 star</label>
          </div>
      ) : null;

      const error = mediaError !== undefined ? <h1>Error</h1> : null;

      const mediaElems = media !== undefined ? (
          <div className='mediaBody'>
              <ReactPlayer className='media-box' url={authen ? 'https://s3.amazonaws.com/videovault4800/movies/Bird+Box.mp4' : ''} controls />
              {media.season_info !== undefined && <div id='overflowBox'>{seasonInfo}</div>}
              <h1>
                  {media.title || title}
                  <span>
                    (
                      {media.year}
                    )

                  </span>
              </h1>
              {media.season_info !== undefined && <h3>SEASONS</h3>}

              <img src={media.image_url} alt='Cover art' className='boxArt' />
              {media.season_info === undefined && authen && <Button color='danger' className='rent-button'>Rent</Button>}
              {media.season_info !== undefined && authen && <Button color='danger' className='subscribe-button'>Subscribe</Button>}
              <div className='container'>
                  <div className='media-info'>
                      <h5>
                        RATING :
                          {media.avg_rating !== null ? media.avg_rating : 'NO RATINGS'}
                      </h5>
                      <h5>SYNOPSIS</h5>
                      <p>{media.description}</p>
                  </div>
              </div>
              {commentElems}
              {commentContainer}
              {StarRating}
          </div>
      ) : null;


      return (
          <body className='background-color'>
              <div className='media-default-page'>
                  <Header />
                  <div className='movie-container'>
                      {mediaElems || error}
                  </div>
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
