import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './contentBox.scss';

export default class ContentBox extends React.Component {

  static propTypes = {
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
  };


  render() {

      const { image, title } = this.props;

      return (
          <div className='contentBox'>
              <img src={image} alt='default' className='imgDiv' />
              <Link to={
                  {
                      pathname: `/media/${title}`,
                      state: {
                          title,
                      },
                  }
              }
              >
                  <h6 className='centerText'>{title}</h6>
              </Link>
          </div>
      );
  }
}
