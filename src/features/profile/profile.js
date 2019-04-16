import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import * as profileActions from './redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import TimelinePost from '../common/timelinePost';
import './profile.scss';

class Profile extends Component {

    static propTypes = {
        common: PropTypes.object.isRequired,
        profileActions: PropTypes.object.isRequired,
        profile: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getWall = this.getWall.bind(this);
    }

    componentDidMount() {


    }

    getWall() {
        const { profileActions, common } = this.props;
        const { userData } = common;
        const { getWall } = profileActions;
        getWall(userData.id);
    }

    render() {
        const { common, profile } = this.props;
        const { authen, userData } = common;
        const { wall, getWallError, getWallPending } = profile;

        if (authen && wall === undefined && userData !== undefined && !getWallPending && (getWallError === null || getWallError === undefined)) {
            this.getWall();
        }

        const postElems = wall !== undefined && authen ? wall.map(post => (
            <div className='post'>
                <TimelinePost image='https://i.redd.it/9kzcg7xk4q321.png' name={post.post_username} message={post.post} test={post.comments} />
            </div>
        )) : null;

        return (
            <div className='background'>
                <Header />
                <div className='gridContainer'>
                    <div>
                        {postElems}
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
