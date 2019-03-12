import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Footer from '../common/footer';
import ContentBox from '../common/contenBox';
import SearchBar from '../common/SearchBar';
import './home.scss';

export class Home extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        common: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            filter: 'all',
            query: '',
            searchFunc: p => this.getRecentlyAdded(p),
        };

        this.getMovieList = this.getMovieList.bind(this);
        this.getActorList = this.getActorList.bind(this);
        this.getTVList = this.getTVList.bind(this);
        this.getRecentlyAdded = this.getRecentlyAdded.bind(this);
        this.setSearchParams = this.setSearchParams.bind(this);
        this.search = this.search.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);

    }

    componentDidMount() {
        const { page, searchFunc } = this.state;
        searchFunc(page);
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

    getRecentlyAdded(pageNum) {
        const { actions } = this.props;
        const { getRecents } = actions;
        getRecents(pageNum);
    }

    setSearchParams(filter, query) {
        this.setState({
            filter,
            query,
        }, () => this.search());
    }

    search() {

    }

    nextPage() {
        const { page, searchFunc } = this.state;
        searchFunc(page + 1);
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }

    backPage() {
        const { page } = this.state;
        this.getRecentlyAdded(page - 1);
        this.setState(prevState => ({ page: prevState.page - 1 }));
    }


    render() {
        const { common } = this.props;
        const { page } = this.state;
        const { recents, maxPages, searchError } = common;

        const error = searchError !== undefined ? (<h1>Error</h1>) : null;

        const boxes = (recents !== undefined) ? recents.map(content => (
            <ContentBox title={content.title} url={content.url} image={content.image_url} key={content.id} />
        )) : null;

        const loadingGrid = [];
        const searchFilters = ['All', 'Movies', 'TV Shows', 'Actors', 'Users'];


        for (let i = 0; i < 20; i += 1) {
            loadingGrid.push(<i className='fa fa-spinner fa-spin loadIcon' key={i} />);
        }

        return (
            <div className='home-root'>
                <Header />
                <br />
                <SearchBar filters={searchFilters} searchFunc={() => this.setSearchParams} />
                <br />
                <br />
                <div className='main'>

                    {error !== null ? (boxes || loadingGrid) : error}

                </div>
                <div className='buttonHolder'>
                    {page !== 1 ? <Button color='primary' onClick={this.backPage} className='paginateButton'> Back </Button>
                        : <Button color='primary' onClick={this.backPage} className='paginateButton' disabled> Back </Button>}
                    <h6 className='pageCounter'>
                        {page}
                        /
                        {maxPages}
                    </h6>
                    {maxPages !== undefined && page < maxPages
                        ? <Button color='primary' onClick={this.nextPage} className='paginateButton'> Next </Button>
                        : <Button color='primary' onClick={this.nextPage} className='paginateButton' disabled> Next </Button>}
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
