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
        console.log(this.props)
        console.log('rating')
        const starArray = [ ];
        for(var i=0; i<rating; i++){
          starArray.push(
            <span class="fa fa-star checked">&nbsp;</span>
          )
        }
  
        return (
            <div className='rating'>
              {starArray.map(stars => (stars) )}
            </div>
        );
    }
  }
/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        rating: state.rating,
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
