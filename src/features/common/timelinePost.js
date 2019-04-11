import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import UserComment from '../common/userComment';
import './timelinePost.scss';

class TimelinPost extends React.Component {
    static propTypes = {
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        test: PropTypes.object,
    };


    render() {

        const  {image, name, message, test} = this.props;
        {console.log(image)}
             const commentContainer = test ? (
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
      ) : null;

        const commentElems = test !== undefined ? test.map(comment => (
            <UserComment comment={comment.comment} user={comment.username} date={comment.date_of_comment} />
        )) : null;
        
        return (
            <div>
                <img src={image} alt='default' className='profile' />
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


export default connect(mapStateToProps, mapDispatchToProps)(TimelinPost);
