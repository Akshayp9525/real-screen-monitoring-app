import { Navigate, Outlet } from 'react-router-dom';
import { isLogin } from '../utils';

const PublicRoute = () => {
  return isLogin() ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoute;
