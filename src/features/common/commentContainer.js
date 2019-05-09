import React from 'react';
import PropTypes from 'prop-types';
import './commentContainer.scss';

class CommentContainer extends React.Component {

    static propTypes = {
        comment: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        buttonText: PropTypes.string.isRequired,
        placeHolderText: PropTypes.shape.isRequired,
        buttonFunc: PropTypes.func.isRequired,
        changeFunc: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };

    render() {
        const { title, buttonText, placeHolderText, buttonFunc, changeFunc, comment, disabled } = this.props;

        const commentContainer = (
            <div className='comment-container'>
                <label htmlFor='Comment' className='comment-label'>
                    { `${title}: ` }
                </label>
                <input
                  maxlength='250' //eslint-disable-line
                  onChange={e => changeFunc(e.target.value)} //eslint-disable-line
                  id='subject' //eslint-disable-line
                  name='subject' //eslint-disable-line
                  value={comment} //eslint-disable-line
                  placeholder={placeHolderText} //eslint-disable-line
                  className='textArea' //eslint-disable-line
                />
                <input disabled={disabled} className='postButton' type='button' value={buttonText} onClick={buttonFunc} />
            </div>
        );

        return (
            <div>
                { commentContainer }
            </div>
        );
    }

}

CommentContainer.defaultProps = {
    disabled: false,
};

export default CommentContainer;
