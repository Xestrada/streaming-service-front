// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

const initialState = {
    actorsPending: false,
    actorsError: null,
    moviesPending: false,
    moviesError: null,
    tvShowsPending: false,
    tvShowsError: null,
    searchPending: false,
    searchError: null,
    signupPending: false,
    signupError: null,
    mediaPending: false,
    mediaError: null,
    authenPending: false,
    authenError: null,
    subsPending: false,
    subsError: null,
    ratedMoviesPending: false,
    ratedMoviesError: null,
    ratedTvPending: false,
    ratedTvError: null,
    getRentedPending: false,
    getRentedError: null,
    getFriendsPending: false,
    getFriendsError: null,
    addSlotPending: false,
    addSlotError: null,
    addInitialSubsPending: false,
    addInitialSubsError: null,
    addFriendPending: false,
    addFriendError: null,
    removeFriendPending: false,
    removeFriendError: null,
    checkFriendshipPending: false,
    checkFriendshipError: null,
    hasAllSlotsPending: false,
    hasAllSlotsError: null,
  localAuthenPending: false,
  localAuthenError: null,
};

export default initialState;
