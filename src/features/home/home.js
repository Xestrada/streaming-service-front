import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import './home.scss';

export class Home extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidMount() {
        const { actions } = this.props;
        const { getMovies } = actions;
        getMovies();
    }


    render() {
        const { common } = this.props;
        const { movies } = common;

        const movieTable = movies !== undefined ? movies.map(item => (
            <h1>{item.title}</h1>
        )) : null;

        return (
            <div className='home-root'>
                <Header />
                <div className='main'>
                    {movieTable}
                </div>
                <Footer />
            </div>
        );
    }

}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        home: state.home,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
