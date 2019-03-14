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
import emptyImg from '../../images/noimage.png';
import './tvShows.scss';

class TVshows extends Component {
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

    getRecentlyAdded(pageNum) {
        const { actions } = this.props;
        const { getTV } = actions;
        getTV(pageNum);
    }

    setSearchParams(filter, query) {
        const filterURL = this.createSearchURL(filter);
        this.setState({
            filter: filterURL,
            query,
            page: 1,
            searchFunc: p => this.search(p),
        }, () => this.search(1));
    }

    createSearchURL(filter) {
        switch (filter) {
        case 'All':
            return 'all';
        case 'Title':
            return 'title';
        case 'Genre':
            return 'genre';
        case 'Year':
            return 'year';
        case 'Service':
            return 'service';
        case 'Actors':
            return 'actor';
        default:
            return 'all';
        }
    }

    search(pageNum) {
        const { actions } = this.props;
        const { filter, query } = this.state;
        const { searchTV } = actions;
        searchTV(filter, query, pageNum);
    }

    nextPage() {
        const { page, searchFunc } = this.state;
        searchFunc(page + 1);
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }

    backPage() {
        const { page, searchFunc } = this.state;
        searchFunc(page - 1);
        this.setState(prevState => ({ page: prevState.page - 1 }));
    }


    render() {
        const { common } = this.props;
        const { page } = this.state;
        const { tvShows, maxPages, searchError } = common;

        const error = searchError !== undefined ? (<h1>Error</h1>) : null;

        const boxes = (tvShows !== undefined) ? tvShows.map(content => (
            <ContentBox title={content.title || content.full_name} url={content.url} image={content.image_url || emptyImg} key={content.id} />
        )) : null;

        const loadingGrid = [];
        const searchFilters = ['All', 'Title', 'Genre', 'Year', 'Service', 'Actors'];


        for (let i = 0; i < 20; i += 1) {
            loadingGrid.push(<i className='fa fa-spinner fa-spin loadIcon' key={i} />);
        }

        return (
            <div className='home-root'>
                <Header />
                <br />
                <SearchBar filters={searchFilters} searchFunc={this.setSearchParams} />
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
        tvShows: state.tvShows,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TVshows);