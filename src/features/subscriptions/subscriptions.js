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
        const { authen, subs, userData } = common;

        const redir = (!authen || userData == null) ? (<Redirect to='/' />) : null;
        const subbedTV = subs !== undefined ? subs.map(content => (
            <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
        )) : null;

        return (
            <div className='background-color'>
                <div>
                    {redir}
                    <Header />
                    <div className='container'>
                        <div className='slots-header'>
                            <h1>Slots</h1>
                            {subbedTV}
                        </div>
                    </div>

                    <div className='container'>
                        <div className='rented-header'>
                            <h1>Rented</h1>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='rMovies-header'>
                            <h1>Rated Movies</h1>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='rTv-header'>
                            <h1>Rated TV Shows</h1>
                        </div>
                    </div>
                    <Footer />
                </div>
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
