import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import * as profileActions from './redux/actions';
import * as userActions from '../user/redux/actions';
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
        user: PropTypes.object.isRequired,
        userActions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getWall = this.getWall.bind(this);
        this.getRatedMovies = this.getRatedMovies.bind(this);
        this.getRatedTV = this.getRatedTV.bind(this);
        this.getUserFriends = this.getUserFriends.bind(this);
        this.getFriendRequests = this.getFriendRequests.bind(this);
    }

    componentDidMount() {
        const { common } = this.props;
        const { authen } = common;
        if (authen) {
            this.getRatedMovies();
            this.getRatedTV();
            this.getUserFriends();
            this.getFriendRequests();
            this.getWall();
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

    getFriendRequests() {
        const { common, userActions } = this.props;
        const { userData } = common;
        const { getFreindRequests } = userActions;
        getFreindRequests(userData.id);
    }


    render() {
        const { common, profile, user } = this.props;
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
        const { friendRequests } = user;

        if (authen && wall === undefined && !getWallPending && (getWallError === null || getWallError === undefined)) {
            this.getWall();
        }

        const postElems = wall !== undefined && authen && !getWallPending ? wall.map(post => (
            <div className='post'>
                <TimelinePost
                    name={post.post_username} //eslint-disable-line
                    message={post.post} //eslint-disable-line
                    comments={post.comments} //eslint-disable-line
                    postId={post.post_id} //eslint-disable-line
                    postUserId={post.post_user_id} //eslint-disable-line
                    userId={post.user_id} //eslint-disable-line
                    refreshFunc={this.getWall} //eslint-disable-line
                />
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

        const friendRequestList = friendRequests === undefined ? null : friendRequests.map(request => (
            <ContentBox title={request.username} url={`/user/${request.username}/${request.id}`} image={emptyImg} />
        ));

        const redir = authen ? null : (<Redirect to='/' />);

        const empty = (<h2>No Content</h2>);

        const loading = <i className='fa fa-spinner fa-spin loadIcon loadingSpinner' />;

        return (
            <div className='background'>
                <Header />
                {redir}
                <div>
                    <div className='gridContainer'>
                        <h1>Wall</h1>
                        {postElems}
                    </div>
                    {friendRequests !== undefined && friendRequests.length > 0 ? (
                        <div className='gridContainer'>
                            <h1>Friend Requests</h1>
                            <div className='section'>
                                {friendRequestList}
                            </div>
                        </div>
                    ) : null}
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
        user: state.user,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
        profileActions: bindActionCreators({ ...profileActions }, dispatch),
        userActions: bindActionCreators({ ...userActions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
