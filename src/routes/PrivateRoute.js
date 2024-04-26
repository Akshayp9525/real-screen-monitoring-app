import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from '../utils';

const PrivateRoute = () => {
  return isLogin() ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
