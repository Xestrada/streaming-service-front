import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import ContentBox from '../common/contenBox';
import emptyImg from '../../images/noimage.png';
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

        this.getMovieList = this.getMovieList.bind(this);
        this.getActorList = this.getActorList.bind(this);
        this.getTVList = this.getTVList.bind(this);

    }

    componentDidMount() {
        this.getTVList();
    }

    getMovieList() {
        const { actions } = this.props;
        const { getMovies } = actions;
        getMovies();
    }

    getActorList() {
        const { actions } = this.props;
        const { getActors } = actions;
        getActors();
    }

    getTVList() {
        const { actions } = this.props;
        const { getTV } = actions;
        getTV();
    }


    render() {
        const { common } = this.props;
        const { tvShows } = common;
        // const { movies, actors, tvShows } = common;
        // const movieButton = (<Button color='primary' onClick={this.getMovieList}> Movie List </Button>);
        // const actorButton = (<Button color='secondary' onClick={this.getActorList}> Actor List </Button>);

        // const movieTable = (movies !== undefined) ? movies.map(item => (
        //     <h2>{item.title}</h2>),
        // ) : null;

        const tvBoxes = (tvShows !== undefined) ? tvShows.map(tv => (
            <ContentBox title={tv.title} url={tv.url} image={emptyImg} />
        )) : null;

        // const actorTable = actors != null ? [] : null;

        // if (actors != null) {
        //     actorTable.push(<h1>Actors: </h1>);
        //     for (let i = 0; i < 100; i += 1) {
        //         actorTable.push(<h2>{actors[i].first_name}</h2>);
        //     }
        // }

        return (
            <div className='home-root'>
                <Header />
                <br />
                <div className='main'>
                    {tvBoxes}

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
