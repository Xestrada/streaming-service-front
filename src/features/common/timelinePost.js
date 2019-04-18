import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import UserComment from './userComment';
import './timelinePost.scss';

class TimelinePost extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        comments: PropTypes.object,
    };


    render() {

        const { name, message, comments } = this.props;
        const commentContainer = (
            <div id='comment-container'>
                <div id='comment-header'>
                    <label htmlFor='Comment' style={{ textDecoration: 'underline', fontFamily: 'Apple Chancery, cursive' }}>Leave a comment</label>
                </div>
                <textarea

                  onChange={(e) => { //eslint-disable-line
                        this.setState({

                        });
                    }}
                  id='subject' //eslint-disable-line
                  name='subject' //eslint-disable-line
                  placeholder='Enter your comment here...' //eslint-disable-line
                  style={{ borderStyle: 'inset', width: '600px', height: '90px' }} //eslint-disable-line
                />
                <div className='row'>
                    <input style={{ marginLeft: '52%' }} type='submit' value='Post Comment' onClick={this.makeComment} />
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
