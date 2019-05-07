import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import './contentBox.scss';

class ContentBox extends React.Component {

  static propTypes = {
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      shouldLink: PropTypes.bool,
      pageData: PropTypes.any,
  };


  render() {

      const { image, title, url, shouldLink, pageData } = this.props;

      const page = shouldLink ? (
          <div className='contentBox'>
              <Link to={
                  {
                      pathname: url,
                      state: {
                          title,
                          pageData,
                      },
                  }
              }
              >
                  <img src={image} alt='default' className='imgDiv' />
              </Link>
              <Link to={
                  {
                      pathname: url,
                      state: {
                          title,
                          pageData,
                      },
                  }
              }
              >
                  <h6 className='centerText'>
                      {title}
                  </h6>
              </Link>
          </div>
      ) : (
          <div className='contentBox'>
              <img src={image} alt='default' className='imgDiv' />
              <h6 className='centerText'>
                  {title}
              </h6>
          </div>
      );

      return (
          <div>
              {page}
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        header: state.header,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

ContentBox.defaultProps = {
    shouldLink: true,
    pageData: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentBox);
