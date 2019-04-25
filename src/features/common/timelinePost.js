import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../profile/redux/actions';
import UserComment from './userComment';
import CommentContainer from './commentContainer';
import './timelinePost.scss';

class TimelinePost extends React.Component {
    static propTypes = {
        postId: PropTypes.number.isRequired, // id of the post being commented on
        refreshFunc: PropTypes.func.isRequired, // funcion run after posting on timeline
        name: PropTypes.string.isRequired,
        postedTo: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        common: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        comments: PropTypes.object,
        areFriends: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            userComment: '',
        };

        this.commentOnPost = this.commentOnPost.bind(this);

    }

    commentOnPost() {
        const { common, actions, postId, refreshFunc } = this.props;
        const { commentPost } = actions;
        const { userData } = common;
        const { userComment } = this.state;
        if (userData !== undefined) {
            commentPost({
                user_id: userData.id,
                comment: userComment,
                post_id: postId,
            }).then(refreshFunc);
        }
    }


    render() {

        const { name, message, comments, areFriends, postedTo } = this.props;
        const { userComment } = this.state;

        const commentElems = comments !== undefined ? comments.map(comment => (
            <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
        )) : null;

        const postTitle = name === postedTo ? name : `${name} --> ${postedTo}`;

        return (
            <div>
                {postTitle}
                <div className='spacing'>
                    {message}
                </div>
                {commentElems}
                {areFriends && (
                    <CommentContainer
                    comment={userComment} //eslint-disable-line
                    title='Leave a Comment' //eslint-disable-line
                    buttonText='Post Comment' //eslint-disable-line
                    placeHolderText='Enter your comment here...' //eslint-disable-line
                    buttonFunc={this.commentOnPost} //eslint-disable-line
                    changeFunc={(value) => { //eslint-disable-line
                            this.setState({
                                userComment: value,
                            });
                        }}
                    />
                )}
            </div>


        );
    }
}

TimelinePost.defaultProps = {
    comments: {},
    areFriends: false,
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
