import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import './rating.scss';

class Rating extends React.Component {

  static propTypes = {
      rating: PropTypes.number.isRequired,
  };


  render() {

      const { rating } = this.props;
      return (
          <div className='rating'>
              <div>
                  <input type='radio' id='star5' name='rate' value='5' checked={rating === 5} />
                  <label htmlFor='star5' title='text'>5 stars</label>
                  <input type='radio' id='star4' name='rate' value='4' checked={rating === 4} />
                  <label htmlFor='star4' title='text'>4 stars</label>
                  <input type='radio' id='star3' name='rate' value='3' checked={rating === 3} />
                  <label htmlFor='star3' title='text'>3 stars</label>
                  <input type='radio' id='star2' name='rate' value='2' checked={rating === 2} />
                  <label htmlFor='star2' title='text'>2 stars</label>
                  <input type='radio' id='star1' name='rate' value='1' checked={rating === 1} />
                  <label htmlFor='star1' title='text'>1 star</label>
              </div>
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        header: state.header,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Rating);
