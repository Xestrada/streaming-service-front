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
      const seasonInfo = (media.season_info !== undefined) ? media.season_info.map((content) => {
          const episodeInfo = (content.episodes !== undefined) ? content.episodes.map(item => (
              <div>
                  {console.log('This is episode log.....')}
                  <span>
                      <li>
Episode
                          {' '}
                          {item.episode}
                      </li>

                  </span>
              </div>
          )) : null;

          return (
              <div>
                  {console.log('This is season log.....')}
                  {' '}
                  <Button className='season-position' color='primary' id='toggler' style={{ marginBottom: '1rem' }}>
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
              {console.log(media)}
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
              <h3>SEASONS</h3>
              <h4>CAST</h4>
              <img src={media.image_url} alt='Cover art' className='boxArt' />
              {media.season_info === undefined && <Button color='danger' className='rent-button'>Rent</Button>}
              {media.season_info !== undefined && <Button color='danger' className='subscribe-button'>Subscribe</Button>}
              <Button color='primary' className='play-video'>
              PLAY VIDEO
                  {' '}
                  <i className='fas fa-play' />
                  {' '}
              </Button>
              <div className='container'>
                  <h2>SYNOPSIS</h2>
                  <p>{media.description}</p>
                  <h5>RUNTIME</h5>
                  <h5>AGE RATING</h5>
                  <h5>DIRECTOR</h5>
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
