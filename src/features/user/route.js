// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
    User,
} from '.';

export default {
    path: 'user/:username/:id',
    name: 'User',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: User, isIndex: true },
    ],
};
