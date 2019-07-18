/*  @Todo
    - Split up the router
    - Fix the router gaurd function.
*/

import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';


// Import routes
import privateRoutes from './private';
import publicRoutes from './public';

// Import AuthType Enum
import AuthType from './AuthType';


// Register the Router components for other components to use.
Vue.use(Router);


const router = new Router({
    routes: [
        {
            // Set about view as default view
            path: '/',
            redirect: '/about'
        },
        ...publicRoutes,
        ...privateRoutes
    ]
});


// Function that returns an object with bool values of auth status.
function auth(route) {
    // Get auth requirements from first route object that matches with route navigated to
    const { Auth_requirements } = route.matched[0].meta;

    return {
        public: Auth_requirements === AuthType.public,
        public_only: Auth_requirements === AuthType.public_only,
        private: Auth_requirements === AuthType.private
    };
}


// Checks if user's current auth status matches required auth status for the route being accessed
function AuthChecker(to, from, next) {
    // Get the current user from firebase
    const currentUser = firebase.auth().currentUser;

    // Get the AuthStatus required for accessing the route.
    const AuthType_required_is = auth(to);

    /* Call the next middleware provided by vue router with a route to go to. */
    // If the route is auth protected and user is not logged in, redirect to login page
    if (AuthType_required_is.private && !currentUser)
        next('login');
    // If route is public only and user is logged in, redirect to default private route
    else if (AuthType_required_is.public_only && currentUser)
        next('user-home');
    // Else, just continue navigation as per user request.
    else
        next();
}


// Attach AuthChecker Middleware to run when navigation is made but before actual navigation.
router.beforeEach(AuthChecker);


export default router;