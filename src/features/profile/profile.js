import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import * as profileActions from './redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import ContentBox from '../common/contenBox';
import Rating from '../common/rating';
import TimelinePost from '../common/timelinePost';
import emptyImg from '../../images/noimage.png';
import './profile.scss';

class Profile extends Component {

    static propTypes = {
        common: PropTypes.object.isRequired,
        profileActions: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getWall = this.getWall.bind(this);
        this.getRatedMovies = this.getRatedMovies.bind(this);
        this.getRatedTV = this.getRatedTV.bind(this);
        this.getUserFriends = this.getUserFriends.bind(this);
    }

    componentDidMount() {
        const { common } = this.props;
        const { authen } = common;
        if (authen) {
            this.getRatedMovies();
            this.getRatedTV();
            this.getUserFriends();
        }
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

    getUserFriends() {
        const { actions, common } = this.props;
        const { getFriends } = actions;
        const { userData } = common;
        getFriends(userData.id);
    }

    getWall() {
        const { profileActions, common } = this.props;
        const { userData } = common;
        const { getWall } = profileActions;
        getWall(userData.id);
    }


    render() {
        const { common, profile } = this.props;
        const {
            authen,
            friends,
            getFriendsPending,
            ratedMovies,
            ratedTV,
            ratedTvPending,
            ratedMoviesPending,

        } = common;
        const { wall, getWallError, getWallPending } = profile;

        if (authen && wall === undefined && !getWallPending && (getWallError === null || getWallError === undefined)) {
            this.getWall();
        }

        const postElems = wall !== undefined && authen ? wall.map(post => (
            <div className='post'>
                <TimelinePost image='https://i.redd.it/9kzcg7xk4q321.png' name={post.post_username} message={post.post} test={post.comments} />
            </div>
        )) : null;

        const ratedMoviesList = (ratedMovies !== undefined) ? ratedMovies.map(movie => (
            <div>
                <div>
                    <ContentBox title={movie.movie_title} url={`/media/${movie.movie_title}`} image={movie.image_url || emptyImg} />
                </div>
                <div>
                    <Rating rating={movie.rating} />
                </div>
            </div>
        )) : null;

        const ratedTVList = (ratedTV !== undefined) ? ratedTV.map(content => (
            <div>
                <div>
                    <ContentBox title={content.tv_show_title} url={`/media/${content.tv_show_title}`} image={content.image_url || emptyImg} />
                </div>
                <div>
                    <Rating rating={content.rating} />
                </div>
            </div>
        )) : null;

        const friendsList = friends !== undefined ? friends.map(friend => (
            <ContentBox title={friend.username} url={`/user/${friend.username}/${friend.id}`} image={emptyImg} />
        )) : null;

        const redir = authen ? null : (<Redirect to='/' />);

        const empty = (<h2>No Content</h2>);

        const loading = <i className='fa fa-spinner fa-spin loadIcon loadingSpinner' />;

        return (
            <div className='background'>
                <Header />
                {redir}
                <div className='gridContainer'>
                    <div>
                        <h1>Wall</h1>
                        {postElems}
                    </div>
                    <div className='gridContainer'>
                        <h1>Friends</h1>
                        <div className='section'>
                            {getFriendsPending ? loading : (friendsList || empty)}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rated Movies</h1>
                        <div className='section'>
                            {ratedMoviesPending ? loading : (ratedMoviesList || empty)}
                        </div>
                    </div>

                    <div className='gridContainer'>
                        <h1>Rated TV Shows</h1>
                        <div className='section'>
                            {ratedTvPending ? loading : (ratedTVList || empty)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        profile: state.profile,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        profileActions: bindActionCreators({ ...profileActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
