// router.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './views/LandingPage'
import LoginPage from './views/LoginPage';
import SignupPage from './views/SignupPage';
import MemeGeneratorPage from './views/MemeGeneratorPage';
import SavedMemesPage from './views/SavedMemesPage';



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
    path: '/memegenerator',
    name: 'Meme Generator',
    component: MemeGeneratorPage
  },
  {
    path: '/savedmemes',
    name: 'Saved Memes',
    component: SavedMemesPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
