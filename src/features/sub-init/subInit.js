import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../common/header';
import Results from '../common/results';
import Footer from '../common/footer';
import ContentBox from '../common/contenBox';
import SearchBar from '../common/SearchBar';
import emptyImg from '../../images/noimage.png';
import * as actions from '../common/redux/actions';
import './subInit.scss';

export class SubInit extends Component {
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
          chosenFilms: [],
          savedElems: [],
      };

      this.getRecentlyAdded = this.getRecentlyAdded.bind(this);
      this.setSearchParams = this.setSearchParams.bind(this);
      this.search = this.search.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.backPage = this.backPage.bind(this);
      this.chosenContains = this.chosenContains.bind(this);
      this.selectFilm = this.selectFilm.bind(this);
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

  selectFilm(num, title, url) {
      const { chosenFilms, savedElems } = this.state;
      const array = chosenFilms;
      const elemArray = savedElems;
      const index = array.indexOf(num);
      if (this.chosenContains(num)) {
          array.splice(index, 1);
          elemArray.splice(index, 1);
          this.setState({
              chosenFilms: array,
              savedElems: elemArray,
          });
      } else if (chosenFilms.length < 10) {
          elemArray.push(
              {
                  id: num,
                  title,
                  url,
              },
          );
          array.push(num);
          this.setState({
              chosenFilms: array,
              savedElems: elemArray,
          });
      }
  }

  chosenContains(num) {
      const { chosenFilms } = this.state;
      return chosenFilms.includes(num);
  }


  render() {
      const { common } = this.props;
      const { page, savedElems } = this.state;
      const { tvShows, maxPages, tvShowsError, tvShowsPending } = common;

      const error = tvShowsError !== undefined ? (<h1>Error</h1>) : null;

      const boxes = (tvShows !== undefined) ? tvShows.map(content => (
          <div className={this.chosenContains(content.id) ? 'chosen' : ''} onClick={() => this.selectFilm(content.id, content.title, content.image_url)}>
              <ContentBox shouldLink={false} title={content.title || content.full_name} url={`/media/${content.title}`} image={content.image_url || emptyImg} key={content.id} />
          </div>
      )) : null;

      const selectedList = savedElems.map(content => (
          <ContentBox shouldLink={false} title={content.title} url='' image={content.url || emptyImg} key={content.id} />
      ));

      const loadingGrid = [];
      const searchFilters = ['All', 'Movies', 'TV Shows', 'Actors'];


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
              <br />
              <Results loading={tvShowsPending} error={error} boxes={boxes} page={page} loadingGrid={loadingGrid} maxPages={maxPages} nextPage={this.nextPage} backPage={this.backPage} />
              <br />
              <br />
              <div className='gridContainer'>
                  <h1 className='selectHeader'>Selected</h1>
                  <div className='section'>
                      {selectedList}
                  </div>
              </div>
              <Footer />
          </div>
      );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        subInit: state.subInit,
        common: state.common,
    };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...actions }, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SubInit);
