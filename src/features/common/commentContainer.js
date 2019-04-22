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
    };

    render() {
        const { title, buttonText, placeHolderText, buttonFunc, changeFunc, comment } = this.props;

        const commentContainer = (
            <div id='comment-container'>
                <div id='comment-header'>
                    <label htmlFor='Comment' style={{ textDecoration: 'underline', fontFamily: 'Apple Chancery, cursive' }}>
                        { title }
                    </label>
                </div>
                <textarea

                  onChange={e => changeFunc(e.target.value)} //eslint-disable-line
                  id='subject' //eslint-disable-line
                  name='subject' //eslint-disable-line
                  value={comment} //eslint-disable-line
                  placeholder={placeHolderText} //eslint-disable-line
                  style={{ borderStyle: 'inset', width: '600px', height: '90px' }} //eslint-disable-line
                />
                <div className='row'>
                    <input style={{ marginLeft: '52%' }} type='submit' value={buttonText} onClick={buttonFunc} />
                </div>
            </div>
        );

        return (
            <div>
                { commentContainer }
            </div>
        );
    }

}

export default CommentContainer;
