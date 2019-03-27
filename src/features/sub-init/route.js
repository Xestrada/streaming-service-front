// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
    SubInit,
} from '.';

export default {
    path: 'sub-init',
    name: 'Sub init',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: SubInit, isIndex: true },
    ],
};
