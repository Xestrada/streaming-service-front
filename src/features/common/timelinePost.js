import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../profile/redux/actions';
import UserComment from './userComment';
import './timelinePost.scss';

class TimelinePost extends React.Component {
    static propTypes = {
        postId: PropTypes.number.isRequired, // id of the post being commented on
        userId: PropTypes.number.isRequired, // whose wall/timeline is being commented on
        postUserId: PropTypes.number.isRequired, // user who wrote the post
        refreshFunc: PropTypes.func.isRequired, // funcion run after posting on timeline
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        common: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        comments: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            userComment: '',
        };

        this.commentOnPost = this.commentOnPost.bind(this);

    }

    commentOnPost() {
        const { common, actions, postUserId, postId, userId, refreshFunc } = this.props;
        const { commentPost } = actions;
        const { userData } = common;
        const { userComment } = this.state;
        if (userData !== undefined) {
            commentPost({
                user_id: userId,
                post_user_id: postUserId,
                comment_user_id: userData.id,
                comment: userComment,
                post_id: postId,
            }).then(refreshFunc);
        }
    }


    render() {

        const { name, message, comments } = this.props;
        const { userComment } = this.state;
        const commentContainer = (
            <div id='comment-container'>
                <div id='comment-header'>
                    <label htmlFor='Comment' style={{ textDecoration: 'underline', fontFamily: 'Apple Chancery, cursive' }}>Leave a comment</label>
                </div>
                <textarea

                  onChange={(e) => { //eslint-disable-line
                        this.setState({
                            userComment: e.target.value,
                        });
                    }}
                  id='subject' //eslint-disable-line
                  name='subject' //eslint-disable-line
                  value={userComment} //eslint-disable-line
                  placeholder='Enter your comment here...' //eslint-disable-line
                  style={{ borderStyle: 'inset', width: '600px', height: '90px' }} //eslint-disable-line
                />
                <div className='row'>
                    <input style={{ marginLeft: '52%' }} type='submit' value='Post Comment' onClick={this.commentOnPost} />
                </div>
            </div>
        );

        const commentElems = comments !== undefined ? comments.map(comment => (
            <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
        )) : null;

        return (
            <div>
                {name}
                <div className='spacing'>
                    {message}
                </div>
                {commentElems}
                {commentContainer}
            </div>


        );
    }
}

TimelinePost.defaultProps = {
    comments: {},
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TimelinePost);
