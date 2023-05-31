import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../views/SignUpPage';
import LandingPage from '../views/LandingPage';
import SignIn from '../views/SignInPage';



const routes = [
  {
    path: "/",
    component: LandingPage
  },
  {
    path: '/signup',
    component: SignUp
  },
  {
    path: "/signin",
    component: SignIn
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
