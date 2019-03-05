import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import './home.scss';

export class Home extends Component {

    render() {
        return (
            <div className='home-root'>
                <Header />
                <div className='main' />
                <Footer />
            </div>
        );
    }

}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        home: state.home,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
