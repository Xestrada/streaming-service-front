import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';

export class Media extends Component {
  static propTypes = {
      media: PropTypes.object.isRequired,
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

  render() {

      const { title } = this.state;

      return (
          <div className='media-default-page'>
              <Header />
              {title}
              <Footer />
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        media: state.media,
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
