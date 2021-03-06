import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import mediaReducer from '../features/media/redux/reducer';
import userReducer from '../features/user/redux/reducer';
import subInitReducer from '../features/sub-init/redux/reducer';
import profileReducer from '../features/profile/redux/reducer';
// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
    router: routerReducer,
    home: homeReducer,
    common: commonReducer,
    media: mediaReducer,
    user: userReducer,
    subInit: subInitReducer,
    profile: profileReducer,
};

export default combineReducers(reducerMap);
