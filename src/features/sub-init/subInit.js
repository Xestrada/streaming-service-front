import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SubInit extends Component {
  static propTypes = {
      subInit: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired,
  };

  render() {
      return (
          <div className='sub-init-default-page'>
        Page Content: sub-init/DefaultPage
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        subInit: state.subInit,
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
)(SubInit);
