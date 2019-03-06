import {
    Home,
} from '.';

export default {
    path: '/',
    name: 'Home',
    childRoutes: [
        { path: 'default-page',
            name: 'Default page',
            component: Home,
            isIndex: true,
        },
    ],
};
