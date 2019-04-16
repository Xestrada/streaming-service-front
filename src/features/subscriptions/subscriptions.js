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
        this.getRentedMovies = this.getRentedMovies.bind(this);
    }

    componentDidMount() {
        const { common } = this.props;
        const { authen } = common;
        if (authen) {
            this.getUserShows();
            this.getRentedMovies();
        }

    }

    getUserShows() {
        const { actions, common } = this.props;
        const { getSubs } = actions;
        const { userData } = common;
        getSubs(userData.id);
    }

    getRentedMovies() {
        const { actions, common } = this.props;
        const { getRented } = actions;
        const { userData } = common;
        getRented(userData.id);
    }


    render() {

        const { common } = this.props;
        const {
            authen,
            subs,
            rentedMovies,
            getRentedPending,
            subsPending,
        } = common;

        const subbedTV = subs !== undefined ? subs.map(content => (
            <div className='media'>
                {console.log(subs)}
                <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
            </div>
        )) : null;

        const rentedList = rentedMovies !== undefined ? rentedMovies.map(movie => (
            <ContentBox title={movie.title} url={`/media/${movie.title}`} image={movie.image_url || emptyImg} />
        )) : null;

        const redir = authen ? null : (<Redirect to='/' />);

        const empty = (<h2>No Content</h2>);

        const loading = <i className='fa fa-spinner fa-spin loadIcon loadingSpinner' />;

        return (
            <div className='background-color'>
                <div>
                    {redir}
                    <Header />
                    <div className='gridContainer'>
                        <h1>Slots</h1>
                        <div className='section'>
                            {subsPending ? loading : (subbedTV || empty)}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rented</h1>
                        <div className='section'>
                            {getRentedPending ? loading : (rentedList || empty)}
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
