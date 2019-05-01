import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import * as profileActions from './redux/actions';
import * as userActions from '../user/redux/actions';
import ContentBox from '../common/contenBox';
import Rating from '../common/rating';
import TimelinePost from '../common/timelinePost';
import CommentContainer from '../common/commentContainer';
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

        this.state = {
            userPost: '',
        };

        this.getWall = this.getWall.bind(this);
        this.getRatedMovies = this.getRatedMovies.bind(this);
        this.getRatedTV = this.getRatedTV.bind(this);
        this.getUserFriends = this.getUserFriends.bind(this);
        this.getFriendRequests = this.getFriendRequests.bind(this);
        this.postOnTimeline = this.postOnTimeline.bind(this);
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
        if (userData !== undefined) {
            getWall(userData.id);
        }
    }

    getFriendRequests() {
        const { common, userActions } = this.props;
        const { userData } = common;
        const { getFreindRequests } = userActions;
        getFreindRequests(userData.id);
    }

    postOnTimeline() {
        const { common, profileActions } = this.props;
        const { userPost } = this.state;
        const { userData } = common;
        const { postTimeline } = profileActions;
        postTimeline({
            wall_id: userData.id,
            user_id: userData.id,
            post: userPost,
        }).then(() => {
            this.getWall();
            this.setState({
                userPost: '',
            });
        });
    }


    render() {
        const { common, profile, user } = this.props;
        const { userPost } = this.state;
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
            <div>
                <TimelinePost
                    postedTo={post.username} //eslint-disable-line
                    name={post.post_username} //eslint-disable-line
                    message={post.post} //eslint-disable-line
                    comments={post.comments} //eslint-disable-line
                    postId={post.post_id} //eslint-disable-line
                    refreshFunc={this.getWall} //eslint-disable-line
                    areFriends //eslint-disable-line
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
                {redir}
                <br />
                <div className='gridContainer'>
                    <h1>Wall</h1>
                    <div className='postContainer'>
                        <CommentContainer
                                comment={userPost} //eslint-disable-line
                                title='Post to Timeline' //eslint-disable-line
                                buttonText='Post' //eslint-disable-line
                                placeHolderText='Enter your comment here...' //eslint-disable-line
                                buttonFunc={this.postOnTimeline} //eslint-disable-line
                                changeFunc={(value) => { //eslint-disable-line
                                this.setState({
                                    userPost: value,
                                });
                            }}
                        />
                    </div>
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
