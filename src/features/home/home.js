import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
} from 'reactstrap';
import * as actions from '../common/redux/actions';
import * as profileActions from '../profile/redux/actions';
import background from '../../images/homePageBackground.jpg';
import Results from '../common/results';
import ContentBox from '../common/contenBox';
import SearchBar from '../common/SearchBar';
import TimelinePost from '../common/timelinePost';
import CommentContainer from '../common/commentContainer';
import emptyImg from '../../images/noimage.png';
import './home.scss';

export class Home extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
        profileActions: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            filter: 'all',
            query: '',
            searchFunc: p => this.getRecentlyAdded(p),
            userPost: '',
        };

        this.getMovieList = this.getMovieList.bind(this);
        this.getActorList = this.getActorList.bind(this);
        this.getTVList = this.getTVList.bind(this);
        this.getRecentlyAdded = this.getRecentlyAdded.bind(this);
        this.getTimeline = this.getTimeline.bind(this);
        this.setSearchParams = this.setSearchParams.bind(this);
        this.search = this.search.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);
        this.postOnTimeline = this.postOnTimeline.bind(this);
    }

    componentDidMount() {
        const { page, searchFunc } = this.state;
        searchFunc(page);
        this.getTimeline();
    }

    getMovieList() {
        const { actions } = this.props;
        const { getMovies } = actions;
        getMovies();
    }

    getActorList() {
        const { actions } = this.props;
        const { getActors } = actions;
        getActors();
    }

    getTVList() {
        const { actions } = this.props;
        const { getTV } = actions;
        getTV();
    }

    getRecentlyAdded(pageNum) {
        const { actions } = this.props;
        const { getRecents } = actions;
        getRecents(pageNum);
    }

    getTimeline() {
        const { common, profileActions } = this.props;
        const { userData } = common;
        const { getTimeline } = profileActions;
        if (userData !== undefined) {
            getTimeline(userData.id);
        }
    }

    setSearchParams(filter, query) {
        const filterURL = this.createSearchURL(filter);
        this.setState({
            filter: filterURL,
            query,
            page: 1,
            searchFunc: p => this.search(p),
        }, () => this.search(1));
    }

    postOnTimeline() {
        const { common, profileActions } = this.props;
        const { userPost } = this.state;
        if (userPost === '') {
            return;
        }
        const { userData } = common;
        const { postTimeline } = profileActions;
        postTimeline({
            wall_id: userData.id,
            user_id: userData.id,
            post: userPost,
        }).then(() => {
            this.getTimeline();
            this.setState({
                userPost: '',
            });
        });
    }

    createSearchURL(filter) {
        switch (filter) {
        case 'All':
            return 'all';
        case 'Movies':
            return 'movies/all';
        case 'TV Shows':
            return 'tv_shows/all';
        case 'Actors':
            return 'actors/full';
        case 'Users':
            return 'search/user';
        default:
            return 'All';
        }
    }

    search(pageNum) {
        const { actions } = this.props;
        const { filter, query } = this.state;
        const { searchBy } = actions;
        searchBy(filter, query, pageNum);
    }

    nextPage() {
        const { page, searchFunc } = this.state;
        searchFunc(page + 1);
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }

    backPage() {
        const { page, searchFunc } = this.state;
        searchFunc(page - 1);
        this.setState(prevState => ({ page: prevState.page - 1 }));
    }


    render() {
        const { common, profile } = this.props;
        const { page, userPost } = this.state;
        const { data, maxPages, searchError, searchPending, authen, userData, postTimelinePending } = common;
        const { getTimelinePending, getTimelineError, timeline } = profile;

        if (authen && timeline === undefined && userData !== undefined && !getTimelinePending && (getTimelineError === null || getTimelineError === undefined)) {
            this.getTimeline(userData.id);
        }

        const error = searchError !== undefined ? (<h1>Error</h1>) : null;

        const boxes = (data !== undefined) ? data.map(content => (
            <ContentBox
                title={content.title || content.full_name || content.username} // eslint-disable-line
                url={content.title !== undefined ? `/media/${content.title}` : `/user/${content.username}/${content.id}`} // eslint-disable-line
                image={content.image_url || emptyImg} // eslint-disable-line
                key={content.id} // eslint-disable-line
            />
        )) : null;

        const loadingGrid = [];
        const searchFilters = ['All', 'Movies', 'TV Shows', 'Users'];

        const postElems = authen && timeline !== undefined && !getTimelinePending ? timeline.map(post => (
            <div>
                <TimelinePost //eslint-disable-line
                    isTimeline //eslint-disable-line
                    postedTo={post.username} //eslint-disable-line
                    name={post.post_username} //eslint-disable-line
                    message={post.post} //eslint-disable-line
                    comments={post.comments} //eslint-disable-line
                    postId={post.post_id} //eslint-disable-line
                    refreshFunc={() => this.getTimeline(userData.id)} //eslint-disable-line
                    areFriends //eslint-disable-line
                />
            </div>
        )) : null;

        const homeAds = (
            <div>
                <img className='home-image' src={background} alt='' />
                <div className='advertise-text'>
                    <h1>Variety TV Shows and Movies</h1>
                    <p>Only $10 for a month</p>
                    <Link to='/signup'>
                        <Button color='primary' className='signup-button'> SIGN UP NOW</Button>
                    </Link>
                </div>
            </div>
        );

        const homeMain = authen === undefined || !authen ? homeAds : (
            <div>
                <h1 className='tlTitle'>Timeline</h1>
                <br />
                {getTimelinePending ? (<i className='fa fa-spinner fa-spin loadIcon' />) : (
                    <div>
                        <div className='postContainer'>
                            <CommentContainer
                                disabled={postTimelinePending} //eslint-disable-line
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

                )}
                {getTimelineError && (<h1 className='color-me'>Timeline Error</h1>)}
            </div>
        );

        for (let i = 0; i < 8; i += 1) {
            loadingGrid.push(<i className='fa fa-spinner fa-spin loadIcon' key={i} />);
        }

        return (
            <body className='background-color'>
                <div className='home-root'>
                    <br />
                    {homeMain}
                    <br />
                    <SearchBar filters={searchFilters} searchFunc={this.setSearchParams} />
                    <br />
                    <br />
                    <br />
                    <Results loading={searchPending} error={error} boxes={boxes} page={page} loadingGrid={loadingGrid} maxPages={maxPages} nextPage={this.nextPage} backPage={this.backPage} />
                </div>
            </body>
        );
    }

}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        profile: state.profile,
        home: state.home,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
