import React from 'react';
import PropTypes from 'prop-types';
import './userComment.scss';

export default class UserComment extends React.Component {

    static propTypes = {
        comment: PropTypes.string,
        user: PropTypes.string,
        date: PropTypes.string,

    };

    render() {

        const { user, comment, date } = this.props;

        return (
            <div className='commentBox'>
                <h6 className='user'>{user}</h6>
                <p className='comment'>{comment}</p>
                <h6 className='date'>{date}</h6>
            </div>
        );
    }

}

UserComment.defaultProps = {
    comment: '',
    user: '',
    date: '',
};
