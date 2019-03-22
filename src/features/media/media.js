import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button,
    UncontrolledCollapse,
} from 'reactstrap';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import './media.scss';

export class Media extends Component {
  static propTypes = {
      common: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props);

      const { location } = this.props;
      const { title } = location.state;

      this.state = {
          title,
      };
  }

  componentDidMount() {
      const { actions } = this.props;
      const { getMedia } = actions;
      const { title } = this.state;
      getMedia(title);
  }

  render() {
      const { title } = this.state;
      const { common } = this.props;
      const { media, mediaError } = common;
      const seasonInfo = (media !== undefined && media.season_info !== undefined) ? media.season_info.map((content) => {
          const episodeInfo = (content.episodes !== undefined) ? content.episodes.map(item => (
              <div>
                  <span>
                      <li>
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
                  <Button className='season-position' id='toggler' style={{ textAlign: 'left', marginBottom: '1rem' }}>
                      <li>
Season:
                          {' '}
                          {content.season}
                      </li>
                  </Button>
                  <UncontrolledCollapse className='episdoes-position' toggler='#toggler'>
                      {episodeInfo}
                  </UncontrolledCollapse>
              </div>
          );
      }) : null;

      const error = mediaError !== undefined ? <h1>Error</h1> : null;
      const mediaElems = media !== undefined ? (
          <div className='mediaBody'>
              {media.season_info !== undefined && <div id='overflowBox'>{seasonInfo}</div>}
              <h1>
                  {media.title || title}
                  {' '}
                  <span>
(
                      {media.year}
)

                  </span>
              </h1>
              {media.season_info !== undefined && <h3>SEASONS</h3>}

              <img src={media.image_url} alt='Cover art' className='boxArt' />
              {media.season_info === undefined && <Button color='danger' className='rent-button'>Rent</Button>}
              {media.season_info !== undefined && <Button color='danger' className='subscribe-button'>Subscribe</Button>}
              <div className='container'>
                  <div className='media-info'>
                      <h5>RUNTIME</h5>
                      <h5>AGE RATING</h5>
                      <h5>DIRECTOR</h5>
                      <h5>SYNOPSIS</h5>
                      <p>{media.description}</p>
                  </div>
              </div>
              <div className='comment-container'>
                  <div className='comment-header'>
                      <label htmlFor='Comment' style={{ textDecoration: 'underline' }}>Leave a comment</label>
                  </div>
                  <textarea id='subject' name='subject' placeholder='Enter your comment here...' style={{ borderStyle: 'inset', width: '500px', height: '200px' }} />
                  <div className='row'>
                      <input type='submit' value='Post Comment' />
                  </div>
              </div>
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
        media: state.media,
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
)(Media);
