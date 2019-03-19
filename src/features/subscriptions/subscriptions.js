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
        this.getRatedMovies = this.getRatedMovies.bind(this);
        this.getRatedTV = this.getRatedTV.bind(this);
    }

    componentDidMount() {
        this.getUserShows();
        this.getRatedMovies();
        this.getRatedTV();
    }

    getUserShows() {
        const { actions, common } = this.props;
        const { getSubs } = actions;
        const { userData } = common;
        getSubs(userData.id);
    }

    getRatedMovies() {
        const { actions, common } = this.props;
        const { ratedMovies } = actions;
        const { userData } = common;
        ratedMovies(userData.id);
    }

    getRatedTV() {
        const { actions, common } = this.props;
        const { ratedTv } = actions;
        const { userData } = common;
        ratedTv(userData.id);
    }


    render() {

        const { common } = this.props;
        const { authen, subs, userData, ratedMovies, ratedTV, rented } = common;

        const redir = (!authen || userData == null) ? (<Redirect to='/' />) : null;

        const subbedTV = subs !== undefined ? subs.map(content => (
            <div className='media'>
                <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
            </div>
        )) : null;

        const ratedMoviesList = (ratedMovies !== undefined) ? ratedMovies.map(movie => (
            <ContentBox title={movie.movie_title} url={`/media/${movie.movie_title}`} image={movie.image_url || emptyImg} />
        )) : null;

        const ratedTVList = (ratedTV !== undefined) ? ratedTV.map(content => (
            <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
        )) : null;

        const rentedList = rented !== undefined ? (<br />) : null;

        const empty = (<h2>No Content</h2>);

        return (
            <div className='background-color'>
                <div>
                    {redir}
                    <Header />
                    <div className='gridContainer'>
                        <h1>Slots</h1>
                        <div className='section'>
                            {subbedTV || empty}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rented</h1>
                        <div className='section'>

                            {rentedList || empty}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rated Movies</h1>
                        <div className='section'>

                            {ratedMoviesList || empty}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rated TV Shows</h1>
                        <div className='section'>

                            {ratedTVList || empty}
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
