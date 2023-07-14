// router.js
import {createRouter, createWebHistory} from 'vue-router';
import LandingPage from './views/LandingPage'
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import MemeGeneratorPage from './views/MemeGeneratorPage';
import SavedTemplatesPage from './views/SavedTemplatesPage.vue';
import VerificationPage from "@/views/VerificationPage.vue";
import {Auth} from "@aws-amplify/auth";
import MemesView from "@/views/MemesView.vue";

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupPage
    },
    {
        path: '/verify',
        name: 'Verify',
        component: VerificationPage
    },
    {
        path: '/memes',
        name: 'Memes',
        component: MemesView,
    },
    {
        path: '/memegenerator',
        name: 'MemeGenerator',
        component: MemeGeneratorPage
    },
    {
        path: '/savedtemplates',
        name: 'Saved Templates',
        component: SavedTemplatesPage
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
//before each router check if user is logged in
router.beforeEach(async (to, from, next) => {
    const publicPages = ['/', '/login', '/signup', '/verify'];
    const authRequired = !publicPages.includes(to.path);
    let shouldProceed = true; // Flag to track if the callback should be called

    try {
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken();
        const jwt = accessToken.getJwtToken();

        if (authRequired && jwt) {
            // User is authenticated and accessing a private route
            shouldProceed = true;
        }
    } catch (error) {
        if (authRequired) {
            // User is not authenticated and trying to access a private route
            shouldProceed = false;
            next('/'); // Redirect to the login page
        }
    }

    if (shouldProceed) {
        next(); // Call the callback only if shouldProceed is true
    }
});

export default router;
