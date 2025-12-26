import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, requireAuth = true, userType = null, redirectTo = '/user/login' }) => {
  const { isAuthenticated, userType: currentUserType } = useAuthStore();

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If route requires specific user type and user type doesn't match
  if (userType && currentUserType !== userType) {
    return <Navigate to="/" replace />;
  }

  // If route is only for guests (not authenticated users)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
