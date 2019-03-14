// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
    Media,
} from '.';

export default {
    path: 'media',
    name: 'Media',
    childRoutes: [
        { path: 'default-page', name: 'Default page', component: Media, isIndex: true },
    ],
};
