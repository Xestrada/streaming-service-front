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
                <span>{user}</span>
                <p>{comment}</p>
                <span>{date}</span>
            </div>
        );
    }

}

UserComment.defaultProps = {
    comment: '',
    user: '',
    date: '',
};
