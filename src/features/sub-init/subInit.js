import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import Results from '../common/results';
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
          amountToChoose: 0,
          filter: 'all',
          query: '',
          searchFunc: p => this.getRecentlyAdded(p),
          chosenFilms: [],
          savedElems: [],
          lockedFilms: [],
      };

      this.getRecentlyAdded = this.getRecentlyAdded.bind(this);
      this.setSearchParams = this.setSearchParams.bind(this);
      this.search = this.search.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.backPage = this.backPage.bind(this);
      this.chosenContains = this.chosenContains.bind(this);
      this.lockedContains = this.lockedContains.bind(this);
      this.selectFilm = this.selectFilm.bind(this);
      this.selectSlots = this.selectSlots.bind(this);
      this.getSubs = this.getSubs.bind(this);
      this.getSlots = this.getSlots.bind(this);
  }

  componentDidMount() {
      const { page, searchFunc } = this.state;
      const { common } = this.props;
      const { userData } = common;
      if (userData !== undefined) {
          if (userData.num_slots === undefined) {
              this.getSlots();
          } else {
              this.setState({
                  amountToChoose: userData.num_slots,
              }, this.getSubs);
          }

      }
      searchFunc(page);
  }

  getSubs() {
      const { actions, common } = this.props;
      const { getUserSubs } = actions;
      const { userData } = common;
      getUserSubs(userData.id)
          .then(() => {
              const { common } = this.props;
              const { userSubs } = common;
              userSubs.map(sub => this.selectFilm(sub.id, sub.title, sub.image_url, true));
          });
  }

  getSlots() {
      const { actions, common } = this.props;
      const { getSubs } = actions;
      const { userData } = common;
      getSubs(userData.id)
          .then(() => {
              const { common } = this.props;
              const { subs } = common;
              if (subs !== undefined) {
                  this.setState({
                      amountToChoose: subs.length,
                  }, this.getSubs);
              }
          });
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

  selectFilm(num, title, url, shouldLock) {
      const { common } = this.props;
      const { getUserSubsPending, getSubsPending } = common;

      if (getUserSubsPending || getSubsPending) {
          return;
      }

      const { chosenFilms, savedElems, amountToChoose, lockedFilms } = this.state;
      const array = chosenFilms;
      const elemArray = savedElems;
      const lock = lockedFilms;
      const index = array.indexOf(num);
      if (this.chosenContains(num)) {
          if (!this.lockedContains(num)) {
              array.splice(index, 1);
              elemArray.splice(index, 1);
              this.setState({
                  chosenFilms: array,
                  savedElems: elemArray,
              });
          }
      } else if (chosenFilms.length < amountToChoose) {

          if (shouldLock) {
              lock.push(num);
          }

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
              lockedFilms: lock,
          });
      }
  }

  chosenContains(num) {
      const { chosenFilms } = this.state;
      return chosenFilms.includes(num);
  }

  lockedContains(num) {
      const { lockedFilms } = this.state;
      return lockedFilms.includes(num);
  }

  selectSlots() {
      const { actions, common } = this.props;
      const { addInitialSubs } = actions;
      const { userData } = common;
      const { chosenFilms } = this.state;
      addInitialSubs({
          user_id: userData.id,
          tv_show_id: chosenFilms,
      });
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

  render() {
      const { common } = this.props;
      const { page, savedElems, chosenFilms, amountToChoose } = this.state;
      const {
          authen,
          tvShows,
          maxPages,
          tvShowsError,
          tvShowsPending,
          initialSub,
          areSlotsFull,
          addInitialSubsPending,
      } = common;

      if ((authen !== undefined && !authen) || (areSlotsFull !== undefined && areSlotsFull)) {
          return (<Redirect to='/' />);
      }


      const error = tvShowsError !== undefined ? (<h1>Error</h1>) : null;

      const boxes = (tvShows !== undefined) ? tvShows.map((content) => {
          const chosenStyle = this.chosenContains(content.id) ? 'chosen' : '';
          const lockedStyle = this.lockedContains(content.id) ? 'locked' : '';
          const styles = `${chosenStyle} ${lockedStyle}`;
          return (
          <div //eslint-disable-line
                className={styles} //eslint-disable-line
                onClick={() => { //eslint-disable-line
                        this.selectFilm(content.id, content.title, content.image_url, false); //eslint-disable-line
                    } //eslint-disable-line
                  }
          >{/*eslint-disable-line*/}
                  <ContentBox shouldLink={false} title={content.title || content.full_name} url={`/media/${content.title}`} image={content.image_url || emptyImg} key={content.id} />
          </div> //eslint-disable-line
          );
      }) : null;

      const selectedList = savedElems.map(content => (
          <ContentBox shouldLink={false} title={content.title} url='' image={content.url || emptyImg} key={content.id} />
      ));

      const loadingGrid = [];

      const redir = authen && (initialSub !== undefined || (areSlotsFull !== undefined && !areSlotsFull)) ? null : (<Redirect to='/' />);

      const subRedir = initialSub ? (<Redirect to='/' />) : null;

      const selectButton = chosenFilms.length === amountToChoose ? (<Button disabled={addInitialSubsPending} color='primary' className='centerSub' onClick={this.selectSlots}>Subscribe</Button>) : null;

      const mainPage = (
          <div>
              <br />
              <SearchBar nofilter searchFunc={this.setSearchParams} />
              <br />
              <h1 style={{ color: 'white' }}>{`Select ${amountToChoose} Shows`}</h1>
              <h1 style={{ textAlign: 'center', color: 'whitesmoke' }}>
                  {`${chosenFilms.length}/${amountToChoose}`}
              </h1>
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
              {selectButton}
          </div>
      );

      for (let i = 0; i < 8; i += 1) {
          loadingGrid.push(<i className='fa fa-spinner fa-spin loadIcon' key={i} />);
      }

      return (
          <body id='bg'>
              <div className='home-root'>
                  {redir}
                  {subRedir}
                  {mainPage}
              </div>
          </body>
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
