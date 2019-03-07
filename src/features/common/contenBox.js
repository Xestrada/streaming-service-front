import React from 'react';
import PropTypes from 'prop-types';
import './contentBox.scss';

export default class ContentBox extends React.Component {

  static propTypes = {
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
  };

  constructor(props) {
      super(props);


  }


  render() {

      return (
          <div className = 'contentBox'>
              <img src={this.props.image} alt = 'default' className = 'imgDiv' />
              <a href={this.props.url}><h6 className='centerText'>{this.props.title}</h6></a>
          </div>
      );
  }
}
