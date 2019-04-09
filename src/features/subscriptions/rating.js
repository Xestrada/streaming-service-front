import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import './rating.scss';

class Rating extends React.Component {
    static propTypes = {
        rating: PropTypes.number,
    };


    render() {

        const { rating } = this.props;
        const starArray = [];
        for (let i = 0; i < rating; i += 1) {
            starArray.push(
                <span className='fa fa-star checked'>&nbsp;</span>,
            );
        }

        return (
            <div className='rating'>
                {starArray.map(stars => (stars))}
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

Rating.defaultProps = {
    rating: 0,
};


export default connect(mapStateToProps, mapDispatchToProps)(Rating);
