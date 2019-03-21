import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from 'reactstrap';
import * as actions from '../common/redux/actions';
import Header from '../common/header';
import Results from '../common/results';
import Footer from '../common/footer';
import ContentBox from '../common/contenBox';
import SearchBar from '../common/SearchBar';
import emptyImg from '../../images/noimage.png';
import './home.scss';

const items = [
    {
        src: 'https://images.justwatch.com/backdrop/8628877/s1440/silicon-valley',
        caption: 'SILICON VALLEY',
        header: 'Slide 1 Header',
    },
    {
        src: 'https://i.redd.it/9kzcg7xk4q321.png',
        header: 'Slide 2 Header',
    },
    {
        src: 'https://www.dreadcentral.com/wp-content/uploads/2018/06/pyewacketbanner1200x627.jpg',
        header: 'Slide 3 Header',
    },
];


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
            activeIndex: 0,
        };

        this.getMovieList = this.getMovieList.bind(this);
        this.getActorList = this.getActorList.bind(this);
        this.getTVList = this.getTVList.bind(this);
        this.getRecentlyAdded = this.getRecentlyAdded.bind(this);
        this.setSearchParams = this.setSearchParams.bind(this);
        this.search = this.search.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.backPage = this.backPage.bind(this);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentDidMount() {
        const { page, searchFunc } = this.state;
        searchFunc(page);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
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
        const filterURL = this.createSearchURL(filter);
        this.setState({
            filter: filterURL,
            query,
            page: 1,
            searchFunc: p => this.search(p),
        }, () => this.search(1));
    }

    next() {
        if (this.animating) return;
        const { activeIndex } = this.state;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const { activeIndex } = this.state;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    createSearchURL(filter) {
        switch (filter) {
        case 'All':
            return 'all';
        case 'Movies':
            return 'movies/all';
        case 'TV Shows':
            return 'tv_shows/all';
        case 'Actors':
            return 'actors/full';
        default:
            return 'All';
        }
    }

    search(pageNum) {
        const { actions } = this.props;
        const { filter, query } = this.state;
        const { searchBy } = actions;
        searchBy(filter, query, pageNum);
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
        const { data, maxPages, searchError, searchPending } = common;

        const error = searchError !== undefined ? (<h1>Error</h1>) : null;

        const boxes = (data !== undefined) ? data.map(content => (
            <ContentBox title={content.title || content.full_name} url={`/media/${content.title}`} image={content.image_url || emptyImg} key={content.id} />
        )) : null;

        const loadingGrid = [];
        const searchFilters = ['All', 'Movies', 'TV Shows', 'Actors'];

        const { activeIndex } = this.state;

        const slides = items.map(item => (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        ));

        for (let i = 0; i < 20; i += 1) {
            loadingGrid.push(<i className='fa fa-spinner fa-spin loadIcon' key={i} />);
        }

        return (
            <body className='background-color'>
                <div className='home-root'>
                    <Header />
                    <div>
                        <img className='home-image' src='https://www.whateverison.com/wp-content/uploads/2018/09/movies.jpg' alt='' />
                        <div className='advertise-text'>
                            <h1>Variety TV Shows and Movies</h1>
                            <p>Only $10 for a month</p>
                            <Link to='/signup'>
                                <Button style={{ marginLeft: '14.5em' }} color='primary' className='signup-button'> SIGN UP NOW</Button>
                            </Link>
                        </div>
                    </div>
                    <div className='moveCarousel'>
                        <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                            {slides}
                            <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
                            <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
                        </Carousel>
                    </div>
                    <br />
                    <SearchBar filters={searchFilters} searchFunc={this.setSearchParams} />
                    <br />
                    <br />
                    <br />
                    <Results loading={searchPending} error={error} boxes={boxes} page={page} loadingGrid={loadingGrid} maxPages={maxPages} nextPage={this.nextPage} backPage={this.backPage} />
                    <Footer />
                </div>
            </body>
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
