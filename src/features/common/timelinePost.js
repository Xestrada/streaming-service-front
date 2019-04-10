import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import './timelinePost.scss';

class TimelinPost extends React.Component {
    static propTypes = {
        image: PropTypes.string,
        name: PropTypes.string,
        message: PropTypes.string,
    };


    render() {

        const  {image, name, message} = this.props;
      
        return (
            <div>
                <img src={image} alt='default' className='profile' />
                <h1>
                    {name}
                </h1>
            </div>
            <div>
                <h1>
                    {message}
                </h1>
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
