import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import ContentBox from '../common/contenBox';
import Footer from '../common/footer';
import emptyImg from '../../images/noimage.png';
import './subscriptions.scss';

class Subscriptions extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getUserShows = this.getUserShows.bind(this);
    }

    componentDidMount() {
        this.getUserShows();
    }

    getUserShows() {
        const { actions, common } = this.props;
        const { getSubs } = actions;
        const { userData } = common;
        getSubs(userData.id);
    }


    render() {

        const { common } = this.props;
        const { authen, subs } = common;

        const redir = !authen ? (<Redirect to='/' />) : null;
        const subbedTV = subs !== undefined ? subs.map(content => (
            <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={emptyImg} />
        )) : null;

        return (
            <div>
                {redir}
                <Header />
                {subbedTV}
                <Footer />
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        subscriptions: state.subscriptions,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
