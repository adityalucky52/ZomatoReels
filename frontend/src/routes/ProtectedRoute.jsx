import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ element, allowedType, redirectTo = '/register', guestOnly = false }) => {
  const { isAuthenticated, userType } = useAuthStore();

  // Guest only routes (login, register)
  if (guestOnly && isAuthenticated) {
    if (userType === 'foodpartner') {
      return <Navigate to="/food-partner/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Protected routes
  if (!guestOnly && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check user type if specified
  if (allowedType && userType !== allowedType) {
    return <Navigate to={redirectTo} replace />;
  }

  return element;
};

export default ProtectedRoute;

