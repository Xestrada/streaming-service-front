// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as makeMovieCommentReducer } from './makeMovieComment';
import { reducer as makeTvCommentReducer } from './makeTvComment';
import { reducer as rateMovieReducer } from './rateMovie';
import { reducer as rateTvReducer } from './rateTv';
import { reducer as movieCommentsReducer } from './movieComments';
import { reducer as tvCommentsReducer } from './tvComments';
import { reducer as rentMovieReducer } from './rentMovie';
import { reducer as subTvReducer } from './subTv';
import { reducer as isMediaOwnedReducer } from './isMediaOwned';
import { reducer as getUserRatingReducer } from './getUserRating';
import { reducer as unsubscribeReducer } from './unsubscribe';
import { reducer as resubscribeReducer } from './resubscribe';
import { reducer as deleteSlotReducer } from './deleteSlot';

const reducers = [
    makeMovieCommentReducer,
    makeTvCommentReducer,
    rateMovieReducer,
    rateTvReducer,
    movieCommentsReducer,
    tvCommentsReducer,
    rentMovieReducer,
    subTvReducer,
    isMediaOwnedReducer,
    getUserRatingReducer,
    unsubscribeReducer,
    resubscribeReducer,
    deleteSlotReducer,
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    // Handle cross-topic actions here
    default:
        newState = state;
        break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
