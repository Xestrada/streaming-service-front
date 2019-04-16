import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import * as profileActions from '../profile/redux/actions';
import Footer from '../common/footer';
import TimelinePost from '../common/timelinePost';
import './profile.scss';

class Profile extends Component {

    static propTypes = {
        common: PropTypes.object.isRequired,
        profileActions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.getTimeline = this.getTimeline.bind(this);
    }
       
        componentDidMount() { //eslint-disable-line
        const { common } = this.props;
        const { authen } = common;
        if (authen) {
            this.getTimeline();
        }

    }

    getTimeline() {
        const { profile, profileActions } = this.props;
        const { timeline } = profile;
        const { getTimeline } = profileActions;
        if (timeline === undefined) {
            getTimeline(1);
        }
    }

    render() {
        const { common, profile } = this.props;
        const { 
            timeline,
        } = profile;
        if(timeline === undefined ){
        this.getTimeline();
        }

        const postElems = this.timeline !== undefined ? this.timeline.map(post => (
            <div className='post'>
            <TimelinePost image='https://i.redd.it/9kzcg7xk4q321.png' name={post.post_username} message={post.post} test={post.comments} />
            </div>
      )) : null;

        return (
            <div className='background'>
                <div className='gridContainer'>
                    <div>
                        {postElems}
                        {console.log(timeline)}
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
