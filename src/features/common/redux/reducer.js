// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as actorsReducer } from './actors';
import { reducer as moviesReducer } from './movies';
import { reducer as tvShowsReducer } from './tvShows';
import { reducer as searchReducer } from './search';
import { reducer as signupReducer } from './signup';
import { reducer as mediaReducer } from './media';
import { reducer as authenReducer } from './authen';
import { reducer as subsReducer } from './subs';
import { reducer as ratedMoviesReducer } from './ratedMovies';
import { reducer as ratedTvReducer } from './ratedTv';
import { reducer as getRentedReducer } from './getRented';
import { reducer as getFriendsReducer } from './getFriends';
import { reducer as addSlotReducer } from './addSlot';

const reducers = [
    actorsReducer,
    moviesReducer,
    tvShowsReducer,
    searchReducer,
    signupReducer,
    mediaReducer,
    authenReducer,
    subsReducer,
    ratedMoviesReducer,
    ratedTvReducer,
    getRentedReducer,
    getFriendsReducer,
    addSlotReducer,
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    // Handle cross-topic actions here
    default:
        newState = state;
        break;
    }
    /* istanbul ignore next */
    return reducers.reduce((s, r) => r(s, action), newState);
}
