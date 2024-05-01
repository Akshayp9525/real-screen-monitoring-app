import Login from '../components/Login';
import MainLayout from '../components/index';

const routesConfig = [
  {
    path: '/auth/login',
    component: Login,
    private: false,
  },
  {
    path: '/dashboard',
    component: MainLayout,
    // private:true
  }
];

export default routesConfig;